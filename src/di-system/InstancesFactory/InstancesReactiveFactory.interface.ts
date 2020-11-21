import { InstancesContainer } from '../IocContainer/IoCContainer.interface';

export interface InstancesReactiveFactory {
  useInstancesContainer(): InstancesContainer;
}
