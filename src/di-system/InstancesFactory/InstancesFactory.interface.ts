import { InstancesContainer } from '../IocContainer/IoCContainer.interface';

export interface InstanceReactiveContainer {
  useInstancesContainer(): InstancesContainer;
}
