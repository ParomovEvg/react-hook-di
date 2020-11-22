import { ProviderMetadata } from './ProviderMetaData.type';
import { InjectionToken } from './types/InjectionToken.type';
import { ModuleRef } from './types/ModuleRef.type';

export interface ModuleMetadata {
  imports?: Array<ModuleRef>;
  providers?: ProviderMetadata[];
  providerExports?: Array<InjectionToken>;
  moduleReExports?: Array<ModuleRef>;
  name: string;
}
