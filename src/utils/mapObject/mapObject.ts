import { ValueOf } from '../types/ValueOf';

export function mapObject<T extends Record<string, any>, R>(
  object: T,
  mapFunction: (v: ValueOf<T>) => R
): Record<keyof T, R>;
export function mapObject(object: any, mapFunction: any): any {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [key, mapFunction(value)])
  );
}
