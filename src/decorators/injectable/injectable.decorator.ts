import 'reflect-metadata';
import { v4 as uuid } from 'uuid';
import { Type } from '../../utils/types/Type.type';
import { PARAMTYPES_METADATA } from '../../constants';
import { MetadataService } from '../../di-system/MetadataService/MetadataService';

export function Injectable(): ClassDecorator {
  return (target: object) => {
    const res = Reflect.getMetadata(PARAMTYPES_METADATA, target) ?? [];
    MetadataService.defineTokensFromInjectable(target, res);
  };
}

export function mixin(mixinClass: Type<any>) {
  Object.defineProperty(mixinClass, 'name', {
    value: uuid(),
  });
  Injectable()(mixinClass);
  return mixinClass;
}
