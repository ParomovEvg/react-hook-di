import { InjectionToken } from '..';

export class MetadataService {
  constructor() {}

  scanDependencies(target: object): InjectionToken[] {
    const fromInjectableTokens = MetadataService.getTokensFromInjectable(target);
    return fromInjectableTokens.map((tokenFromInjectable, i) => {
      const fromInjectToken = MetadataService.getTokenFromInject(target, i);
      if (fromInjectToken) {
        return fromInjectToken;
      } else {
        return tokenFromInjectable;
      }
    });
  }

  static defineTokensFromInjectable(target: object, tokens: InjectionToken[]): void {
    Reflect.defineMetadata(MetadataService.injectionTokensFromInjectable, tokens, target);
  }

  static defineTokenFromInject(target: object, index: number, token: InjectionToken): void {
    const res = MetadataService.getTokensFromInject(target);
    const newRes = { ...res, [index]: token };
    Reflect.defineMetadata(MetadataService.injectionTokensFromInject, newRes, target);
  }

  static isInjectable(target: object): boolean {
    return !!Reflect.getMetadata(MetadataService.injectionTokensFromInjectable, target);
  }

  static getTokensFromInjectable(target: object): InjectionToken[] {
    return Reflect.getMetadata(MetadataService.injectionTokensFromInjectable, target) ?? [];
  }

  static getTokenFromInject(target: object, index: number): InjectionToken | undefined {
    return MetadataService.getTokensFromInject(target)[index];
  }

  static getTokensFromInject(target: object): InjectionToken[] {
    return Reflect.getMetadata(MetadataService.injectionTokensFromInject, target) ?? {};
  }

  static injectionTokensFromInjectable = Symbol('injectable param types');

  static injectionTokensFromInject = Symbol('inject param type');
}
