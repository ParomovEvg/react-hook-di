import { InjectionToken, Module } from '../../di-system';

export interface AvailableProvidersScanner {
  getProviders(module: Module): Set<InjectionToken>;
}
