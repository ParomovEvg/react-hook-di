import { ReactHookFactoryProviderMetadata } from '../../metadata/ProviderMetaData.type';
import { ProviderBaseFactory } from './ProviderBase';

export class ReactHookFactoryProvider {
  constructor(private BaseProviderConstructor: ProviderBaseFactory) {}
  create(metadata: ReactHookFactoryProviderMetadata) {
    const inject = metadata.inject ?? [];
    return this.BaseProviderConstructor(metadata.provide, inject, metadata.useReactHookFactory);
  }
}
