import { MetadataService } from '../../MetadataService/MetadataService';
import { useEffect } from 'react';
import { mergeArrayOfBoxesStrict } from '../../../utils/shared.utils';
import { ProviderBaseFactory } from './ProviderBase';
import { Type } from '../../../utils/types/Type.type';
import { UseInstanceBox } from "../..";
import { ResultBox } from 'value-box-ts';

export class ConstructorProvider {
  constructor(private BaseProviderConstructor: ProviderBaseFactory) {}
  create(Class: Type<any>, metadataScanner: MetadataService) {
    const inject = metadataScanner.scanDependencies(Class);
    const useFactory: UseInstanceBox = (update, ...depsBoxes) => {
      useEffect(() => {
        mergeArrayOfBoxesStrict(depsBoxes).map(deps => {
          update(ResultBox.of(new Class(...deps)));
        });
      }, [...depsBoxes]);
    };

    return this.BaseProviderConstructor(Class, inject, useFactory);
  }
}
