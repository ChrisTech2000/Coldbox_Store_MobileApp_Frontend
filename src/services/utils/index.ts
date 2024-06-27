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

export const serialize = (obj: Json): Json => {
  if (Array.isArray(obj)) {
    return obj.map((item) => serialize(item));
  } else if (isObject(obj)) {
    const { unserializable, ...rest } = obj as JsonObject;

    return Object.keys(rest).reduce<JsonObject>((acc, key) => {
      if (unserializable && Array.isArray(unserializable) && unserializable.includes(key)) {
        acc[key] = serialize(rest[key]);
      } else {
        acc[snakeCase(key)] = serialize(rest[key]);
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
