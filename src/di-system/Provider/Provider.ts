import { InjectionToken } from '..';
import { InstancesContainer } from '../IocContainer/IoCContainer.interface';
import { InstanceBox } from '../IocContainer/InstanceBox';

export type UpdateInstance = (key: InjectionToken, instance: InstanceBox) => void;

export interface ReactiveInstanceFactory {
  useInstanceFactory(instanceContainer: InstancesContainer, updateInstance: UpdateInstance): void;
}
export interface WithInjectionToken {
  getInjectionToken(): InjectionToken;
}

export interface Provider extends ReactiveInstanceFactory, WithInjectionToken {}
