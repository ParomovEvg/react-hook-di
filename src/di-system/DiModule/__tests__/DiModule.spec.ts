import { ValueProviderMetadata } from '../../metadata/ProviderMetaData.type';
import { TestProviderFactory } from './TestProviderFactory';
import { DiModule } from '../DiModule';

const createProvider = () => {
  return {
    provide: Symbol,
    value: Symbol,
  } as ValueProviderMetadata;
};


const testProviderFactory = new TestProviderFactory();

describe('DiModule', () => {
  const module3 = new DiModule(
    {
      providers: [createProvider()],
    },
    testProviderFactory
  );

  const module21 = new DiModule(
    {
      imports: [module3],
      providers: [createProvider(), createProvider()],
    },
    testProviderFactory
  );
  const module22 = new DiModule(
    {
      imports: [module3],
      providers: [createProvider(), createProvider()],
    },
    testProviderFactory
  );
  const module1 = new DiModule(
    {
      imports: [module22, module21],
      providers: [createProvider()],
    },
    testProviderFactory
  );
  describe('getProviders', () => {
    it('should return array with all providers in sub tree', () => {
      const res = module1.getProviders();
      expect(res).toEqual(TestProviderFactory.createdProviders);
    });
  });

  describe('getInjectionTokens', () => {
    it('should return array with all providers injection tokens is sub tree', () => {
      const res = module1.getInjectionTokens();
      expect(res).toEqual(TestProviderFactory.createdInjectionTokens);
    });
  });
  beforeEach(() => TestProviderFactory.clearProviders());
});
