import { useCallback, useState } from 'react';
import { ReactiveInstanceFactory, UpdateInstance } from '../Provider/Provider';
import {
  InstancesContainer,
  UpdatableInstanceContainer,
} from '../IocContainer/IoCContainer.interface';
import { InjectionTokensContainer, ProvidersContainer } from '..';
import { InstancesReactiveFactory } from './InstancesReactiveFactory.interface';
import { IoCContainer } from '../IocContainer/IoCContainer';

export class InstancesFactory implements InstancesReactiveFactory {
  constructor(
    private providers: ReactiveInstanceFactory[],
    private ioCContainer: InstancesContainer & UpdatableInstanceContainer
  ) {}

  static fromRootModule(rootModule: InjectionTokensContainer & ProvidersContainer) {
    return new InstancesFactory(rootModule.getProviders(), IoCContainer.create(rootModule));
  }

  useInstancesContainer(): InstancesContainer {
    const [container, updateInstance] = this.useContainerState();
    this.useCreateInstancesEffect(container, updateInstance);
    return container;
  }

  private useContainerState() {
    const [container, setContainer] = useState(this.ioCContainer);
    const updateInstance: UpdateInstance = useCallback(
      (key, instance) =>
        setContainer(lastContainer => lastContainer.immutableUpdate(key, instance)),
      []
    );
    return [container, updateInstance] as const;
  }

  private useCreateInstancesEffect(container: InstancesContainer, updateInstance: UpdateInstance) {
    for (const provider of this.providers) {
      provider.useInstanceFactory(container, updateInstance);
    }
  }
}
