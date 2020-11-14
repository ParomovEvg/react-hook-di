import { InstancesContainer } from '../../IocContainer/IoCContainer.interface';
import { useCallback, useMemo } from 'react';
import { Provider, UpdateInstance } from '../Provider';
import { InstanceBox } from '../../IocContainer/InstanceBox';
import {InjectionToken, UseInstanceBox} from "../..";

export class ProviderBase implements Provider {
  constructor(
    private provide: InjectionToken,
    private inject: InjectionToken[],
    private useInstanceBox: UseInstanceBox
  ) {}

  static create(provide: InjectionToken, inject: InjectionToken[], useInstanceBox: UseInstanceBox) {
    return new ProviderBase(provide, inject, useInstanceBox);
  }

  getInjectionToken(): InjectionToken {
    return this.provide;
  }

  useInstanceFactory(instanceContainer: InstancesContainer, updateInstance: UpdateInstance): void {
    const depsBoxes = this.useInstanceDependenciesBox(instanceContainer);
    const update = useCallback((box: InstanceBox) => updateInstance(this.provide, box), []);
    this.useInstanceBox(update, ...depsBoxes);
  }

  private useInstanceDependenciesBox(container: InstancesContainer) {
    return useMemo(() => this.inject.map(token => container.getInstance(token)), [container]);
  }
}

export type ProviderBaseFactory = typeof ProviderBase.create;
