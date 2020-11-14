import { ProviderFactory } from '../../Provider/ProviderFacotry/ProviderFactory';
import { Provider } from '../../Provider/Provider';
import { InjectionToken } from '../..';
import { instance, mock, when } from 'ts-mockito';
import { ProviderBase } from '../../Provider/Implementations/ProviderBase';

export class TestProviderFactory implements ProviderFactory {
  create(): Provider {
    const symbol = Symbol(`provider ${TestProviderFactory.createdInjectionTokens.length + 1}`);
    const valueProvider = mock(ProviderBase);
    when(valueProvider.getInjectionToken).thenReturn(() => symbol);
    const res = instance(valueProvider);
    TestProviderFactory.createdProviders.push(res);
    TestProviderFactory.createdInjectionTokens.push(symbol);
    return res;
  }
  static createdProviders: ProviderBase[] = [];
  static createdInjectionTokens: InjectionToken[] = [];
  static clearProviders = () => {
    TestProviderFactory.createdProviders = [];
    TestProviderFactory.createdInjectionTokens = [];
  };
}
