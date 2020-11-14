import { ExistingProviderMetadata } from '../../metadata/ProviderMetaData.type';
import { ProviderBaseFactory } from './ProviderBase';
import { UseInstanceBox } from '../..';
import { useEffect } from 'react';

export class ExistingProvider {
  constructor(private BaseProviderConstructor: ProviderBaseFactory) {}
  create(metadata: ExistingProviderMetadata) {
    const inject = [metadata.existing];
    const useFactory: UseInstanceBox = (update, existing) => {
      useEffect(() => {
        update(existing);
      }, [existing]);
    };
    return this.BaseProviderConstructor(metadata.provide, inject, useFactory);
  }
}
