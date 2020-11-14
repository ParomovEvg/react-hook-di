import { Provider } from '../Provider/Provider';
import { InjectionToken } from '..';

export interface InjectionTokensContainer {
  getInjectionTokens(): InjectionToken[];
}
export interface ProvidersContainer {
  getProviders(): Provider[];
  getProvidersFlatt(): Provider[];
}
export interface ModulesContainer {
  getModules(): Module[];
}

export interface Module extends InjectionTokensContainer, ProvidersContainer, ModulesContainer {}
