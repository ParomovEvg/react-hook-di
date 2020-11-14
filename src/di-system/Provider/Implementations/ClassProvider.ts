import { ClassProviderMetadata } from '../../metadata/ProviderMetaData.type';
import { useEffect } from 'react';
import { ProviderBaseFactory } from './ProviderBase';
import { MetadataService } from '../../MetadataService/MetadataService';
import { UseInstanceBox } from '../..';
import { mergeArrayOfBoxesStrict } from '../../../utils/shared.utils';
import { ResultBox } from 'value-box-ts';

export class ClassProvider {
  constructor(private BaseProviderConstructor: ProviderBaseFactory) {}

  create(metadata: ClassProviderMetadata, metadataScanner: MetadataService) {
    const inject = metadataScanner.scanDependencies(metadata.class);
    const useFactory: UseInstanceBox = (update, ...depsBoxes) => {
      useEffect(() => {
        mergeArrayOfBoxesStrict(depsBoxes).map(deps => {
          update(ResultBox.of(new metadata.class(...deps)));
        });
      }, [...depsBoxes]);
    };
    return this.BaseProviderConstructor(metadata.provide, inject, useFactory);
  }
}
