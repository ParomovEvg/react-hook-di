export class ConstructError<T = undefined> extends Error {
  readonly name = 'ConstructError';
  constructor(message: string, public errorData: T) {
    super(message);
  }
}
