import { MaybeBox, MayFailBox, ValueBox } from 'value-box-ts';
import { InferBoxError, InferBoxValue } from 'value-box-ts/dist/ValueBox/types';

const nullFunction = () => null;

export function RenderValueBox<
  T extends ValueBox<unknown, unknown> | MayFailBox<unknown, unknown> | MaybeBox<unknown>
>(props: {
  box: T;
  error?: (e: InferBoxError<T>) => JSX.Element;
  children: (e: InferBoxValue<T>) => JSX.Element;
  empty?: () => JSX.Element;
}): JSX.Element;
export function RenderValueBox(props: any): JSX.Element {
  const error = props.error ?? nullFunction;
  const empty = props.empty ?? nullFunction;
  return props.box.caseOf({
    error,
    empty,
    result: props.children,
  });
}
