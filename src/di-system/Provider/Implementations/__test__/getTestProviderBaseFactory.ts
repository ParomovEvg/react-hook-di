import { ProviderBase, ProviderBaseFactory } from '../ProviderBase';
import { instance, mock, when } from 'ts-mockito';
import { InjectionToken } from '../../..';
import { UseInstanceBox } from '../../..';

export const getTestProviderBaseFactory = () => {
  const testProviderBaseFactory: ProviderBaseFactory & {
    parameters?: {
      provide: InjectionToken;
      inject: InjectionToken[];
      useInstanceBox: UseInstanceBox;
    };
  } = (provide, inject, useInstanceBox) => {
    const provider = mock<ProviderBase>();
    when(provider.getInjectionToken).thenReturn(() => provide);
    testProviderBaseFactory.parameters = { provide, inject, useInstanceBox };

    return instance(provider);
  };
  return testProviderBaseFactory;
};
