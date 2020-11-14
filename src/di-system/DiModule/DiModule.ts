import { InjectionToken } from '..';
import { ModuleRef } from '..';
import { ModuleMetadata } from '..';
import { ProviderFactory } from '../Provider/ProviderFacotry/ProviderFactory';
import { MetadataService } from '../MetadataService/MetadataService';
import { Provider } from '../Provider/Provider';
import { ForwardReference } from '../../utils/types/forward-reference.type';
import { ProviderFactoryImpl } from '../Provider/ProviderFacotry/ProviderFactoryImpl';
import {
  InjectionTokensContainer,
  Module,
  ModulesContainer,
  ProvidersContainer,
} from './DiModule.interface';

export class DiModule implements InjectionTokensContainer, ProvidersContainer, ModulesContainer {
  constructor(
    public readonly metadata: ModuleMetadata,
    private factory: ProviderFactory = new ProviderFactoryImpl(new MetadataService())
  ) {}

  getProviders(): Provider[] {
    const modules = this.getModules();
    return modules.map(module => module.getProvidersFlatt()).flat();
  }

  getInjectionTokens(): InjectionToken[] {
    return this.getProviders().map(p => p.getInjectionToken());
  }

  getModules(): Module[] {
    const imports = this.metadata.imports ?? [];
    const deepModules = imports
      .map(DiModule.unwrapModuleRef)
      .map(module => module.getModules())
      .map(modulesSet => Array.from(modulesSet))
      .concat([this])
      .flat();
    return Array.from(new Set(deepModules));
  }

  getProvidersFlatt(): Provider[] {
    const providers = this.metadata.providers ?? [];
    return providers.map(provider => this.factory.create(provider));
  }

  static unwrapModuleRef(moduleRef: ModuleRef): Module {
    if (DiModule.isForwardReference(moduleRef)) {
      return moduleRef.forwardRef();
    } else {
      return moduleRef;
    }
  }

  static isForwardReference(module: ModuleRef): module is ForwardReference<Module> {
    return module && !!(module as ForwardReference).forwardRef;
  }
}
