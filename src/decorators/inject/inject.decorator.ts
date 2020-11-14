import 'reflect-metadata';
import { MetadataService } from '../../di-system/MetadataService/MetadataService';
import { InjectionToken } from '../../di-system';

export function Inject(token: InjectionToken) {
  return (target: object, _: string | symbol, index?: number) => {
    if (index !== undefined && token) {
      MetadataService.defineTokenFromInject(target, index ?? 0, token);
    }
  };
}
