export class ConstructError<T = undefined> extends Error {
  readonly name = 'ConstructError';
  readonly errorData: T;
  constructor(message: string);
  constructor(message: string, errorData: T);
  constructor(message: string, errorData?: any) {
    super(message);
    this.errorData = errorData;
  }
}
