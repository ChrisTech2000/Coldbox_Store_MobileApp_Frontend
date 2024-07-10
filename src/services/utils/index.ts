import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';

export type Json = string | number | boolean | null | JsonObject | JsonArray | unknown;
export interface JsonObject {
  [key: string]: Json;
}
export interface JsonArray extends Array<Json> {}

const isObject = (obj: unknown): obj is JsonObject => {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
};

export const serialize = (obj: Json, unserializable: string[] = []): Json => {
  if (Array.isArray(obj)) {
    return obj.map((item) => serialize(item, unserializable));
  } else if (isObject(obj)) {
    const { unserializable: nestedUnserializable, ...rest } = obj as JsonObject;
    const combinedUnserializable = [
      ...unserializable,
      ...((nestedUnserializable as string[]) ?? []),
    ];

    return Object.keys(rest).reduce<JsonObject>((acc, key) => {
      if (combinedUnserializable.includes(key)) {
        acc[key] = serialize(rest[key], combinedUnserializable);
      } else {
        acc[snakeCase(key)] = serialize(rest[key], combinedUnserializable);
      }
      return acc;
    }, {});
  }
  return obj;
};

export const deserialize = (obj: Json): Json => {
  if (Array.isArray(obj)) {
    return obj.map((item) => deserialize(item));
  } else if (isObject(obj)) {
    return Object.keys(obj).reduce<JsonObject>((acc, key) => {
      acc[camelCase(key)] = deserialize(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};

export function subs(url: string, params: { [key: string]: string | number }): string {
  return url.replace(/:([a-zA-Z0-9_]+)/g, (match, p1) => {
    return params[p1] !== undefined ? params[p1].toString() : match;
  });
}
