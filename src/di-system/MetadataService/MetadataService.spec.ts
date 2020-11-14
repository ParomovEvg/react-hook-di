import { InjectionToken } from '..';
import { MetadataService } from './MetadataService';
import { Injectable } from '../../decorators/injectable/injectable.decorator';
import { Inject } from '../../decorators/inject/inject.decorator';

describe('MetadataScanner', () => {
  const scanner = new MetadataService();
  const token1 = 'token';
  const token2 = 'token';
  const tokens = [token1, token2];
  describe('scanDependencies', () => {
    it('should return constructor tokens from injectable service', () => {
      class Service1 {}
      class Service2 {}

      @Injectable()
      class TestService {
        constructor(public s1: Service1, public s2: Service2) {}
      }
      const res = scanner.scanDependencies(TestService);

      expect(res).toEqual([Service1, Service2]);
    });

    it('should return constructor tokens from service, tokens from inject take precedence', () => {
      class Service1 {}
      class Service2 {}

      @Injectable()
      class TestService {
        constructor(public s1: Service1, @Inject(token2) public s2: Service2) {}
      }
      const res = scanner.scanDependencies(TestService);

      expect(res).toEqual([Service1, token2]);
    });
  });

  test('static defineTokensFromInjectable', () => {
    class Target {}
    MetadataService.defineTokensFromInjectable(Target, tokens);
    const res = Reflect.getMetadata(MetadataService.injectionTokensFromInjectable, Target);
    expect(res).toEqual(tokens);
  });

  test('static defineTokenFromInject', () => {
    class Target {}
    MetadataService.defineTokenFromInject(Target, 0, token1);
    const res = Reflect.getMetadata(MetadataService.injectionTokensFromInject, Target) as Record<
      number,
      InjectionToken
    >;
    expect(res[0]).toEqual(token1);
  });

  test('static getTokensFromInjectable', () => {
    class Target {}
    Reflect.defineMetadata(MetadataService.injectionTokensFromInjectable, tokens, Target);
    const res = MetadataService.getTokensFromInjectable(Target);
    expect(res).toEqual(tokens);
  });

  test('static getTokensFromInject', () => {
    class Target {}
    Reflect.defineMetadata(MetadataService.injectionTokensFromInject, tokens, Target);
    const res = MetadataService.getTokensFromInject(Target);
    expect(res).toEqual(tokens);
  });

  test('static getTokenFromInject', () => {
    class Target {}
    Reflect.defineMetadata(MetadataService.injectionTokensFromInject, tokens, Target);
    const res = MetadataService.getTokenFromInject(Target, 0);
    expect(res).toEqual(token1);
  });

  test('static getIsInjectable', () => {
    @Injectable()
    class InjectableClass {}

    class SimpleClass {}

    expect(MetadataService.isInjectable(SimpleClass)).toBe(false);
    expect(MetadataService.isInjectable(InjectableClass)).toBe(true);
  });
});
