import { FactoryProviderMetadata } from '../../metadata/ProviderMetaData.type';
import { useEffect } from 'react';
import { mergeArrayOfBoxesStrict } from '../../../utils/shared.utils';
import { ProviderBaseFactory } from './ProviderBase';
import { UseInstanceBox } from '../..';
import { ResultBox } from 'value-box-ts';

export class FactoryProvider {
  constructor(private BaseProviderConstructor: ProviderBaseFactory) {}
  create(metadata: FactoryProviderMetadata) {
    const inject = metadata.inject ?? [];
    const useFactory: UseInstanceBox = (update, ...depsBoxes) => {
      useEffect(() => {
        mergeArrayOfBoxesStrict(depsBoxes).map(deps => {
          update(ResultBox.of(metadata.factory(...deps)));
        });
      }, [...depsBoxes]);
    };
    return this.BaseProviderConstructor(metadata.provide, inject, useFactory);
  }
}
