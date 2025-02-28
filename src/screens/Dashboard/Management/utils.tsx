import { Geometry } from 'wkx';

export function parsePoint(postgisPoint: string) {
  const wktString = postgisPoint.split(';')[1];
  const point = Geometry.parse(wktString);
  // eslint-disable-next-line
  // @ts-ignore
  const { x: longitude, y: latitude } = point;

  return { latitude, longitude };
}
