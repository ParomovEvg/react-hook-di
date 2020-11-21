import { InjectionToken } from '../di-system';

export class InstanceNotFoundInContainer extends Error {
  constructor(public token: InjectionToken) {
    super(`No instance by token in container ${token.toString()}`);
  }

  static throw(token: InjectionToken): never {
    throw new InstanceNotFoundInContainer(token);
  }
}
