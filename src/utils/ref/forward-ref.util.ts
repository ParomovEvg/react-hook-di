import { ForwardReference } from '../types/forward-reference.type';

export const forwardRef = <T>(fn: () => T): ForwardReference<T> => ({
  forwardRef: fn,
});
