import { ValueProviderMetadata } from '../../metadata/ProviderMetaData.type';
import { useEffect } from 'react';
import { ProviderBaseFactory } from './ProviderBase';
import { UseInstanceBox } from '../..';
import { ResultBox } from 'value-box-ts';

export class ValueProvider {
  constructor(private BaseProviderConstructor: ProviderBaseFactory) {}
  create(metadata: ValueProviderMetadata) {
    const useFactory: UseInstanceBox = update => {
      useEffect(() => {
        update(ResultBox.of(metadata.value));
      }, []);
    };
    return this.BaseProviderConstructor(metadata.provide, [], useFactory);
  }
}
