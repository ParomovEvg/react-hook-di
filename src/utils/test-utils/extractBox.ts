import { MaybeBox, MayFailBox, ValueBox } from 'value-box-ts';
import { InferBoxError, InferBoxValue } from 'value-box-ts/dist/ValueBox/types';

export type UnknownBox =
  | ValueBox<unknown, unknown>
  | MayFailBox<unknown, unknown>
  | MaybeBox<unknown>;

export function extractBox<T extends UnknownBox>(
  box: T
): InferBoxError<T> | InferBoxValue<T> | undefined;
export function extractBox(box: any) {
  return box.caseOf({
    error: (e: any) => e,
    empty: () => undefined,
    result: (r: any) => r,
  });
}
