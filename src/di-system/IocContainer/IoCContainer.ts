import {InjectionToken, InjectionTokensContainer} from '..';
import { EmptyBox } from 'value-box-ts';
import { InstancesContainer, UpdatableInstanceContainer } from './IoCContainer.interface';
import { InstanceBox } from './InstanceBox';

export class IoCContainer implements InstancesContainer, UpdatableInstanceContainer {
  constructor(private instanceMap: Map<InjectionToken, InstanceBox>) {}

  static create(injectionTokenContainer: InjectionTokensContainer) {
    const map = new Map();
    const tokens = injectionTokenContainer.getInjectionTokens();
    for (const token of tokens) {
      map.set(token, EmptyBox.get());
    }
    return new IoCContainer(map);
  }

  getInstance(token: InjectionToken): InstanceBox {
    return this.instanceMap.get(token) ?? EmptyBox.get();
  }

  immutableUpdate(key: InjectionToken, instanceBox: InstanceBox): IoCContainer {
    const newMap = new Map(this.instanceMap);
    newMap.set(key, instanceBox);
    return new IoCContainer(newMap);
  }
}
