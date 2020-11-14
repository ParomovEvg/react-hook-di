import { Type } from '../../utils/types/Type.type';
import { InjectionToken } from './types/InjectionToken.type';
import { UseInstanceBox } from './types/UseInstanceBox.type';

export type ProviderMetadata<T = any > =
  | Type<any>
  | ClassProviderMetadata<T>
  | ValueProviderMetadata<T>
  | FactoryProviderMetadata<T>
  | ReactHookFactoryProviderMetadata<T>
  | ExistingProviderMetadata;

export interface ClassProviderMetadata<T = any> {
  provide: InjectionToken;
  class: Type<T>;
}

export interface ValueProviderMetadata<T = any> {
  provide: InjectionToken;
  value: T;
}

export interface FactoryProviderMetadata<T = any> {
  provide: InjectionToken;
  factory: (...args: any[]) => T;
  inject?: InjectionToken[];
}

export interface ReactHookFactoryProviderMetadata<T = any> {
  provide: InjectionToken;
  useReactHookFactory: UseInstanceBox<T>;
  inject?: InjectionToken[];
}

export interface ExistingProviderMetadata {
  provide: InjectionToken;
  existing: InjectionToken;
}
