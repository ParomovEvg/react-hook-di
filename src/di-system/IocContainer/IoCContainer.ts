import { InjectionToken, InjectionTokensContainer } from '..';
import { EmptyBox } from 'value-box-ts';
import { InstancesContainer, UpdatableInstanceContainer } from './IoCContainer.interface';
import { InstanceBox } from './InstanceBox';
import { InstanceNotFoundInContainer } from '../../exceptions/InstanceNotFoundInContainer';

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
    const res = this.instanceMap.get(token);
    if (!res) InstanceNotFoundInContainer.throw(token);
    return res;
  }

  immutableUpdate(key: InjectionToken, instanceBox: InstanceBox): IoCContainer {
    const newMap = new Map(this.instanceMap);
    newMap.set(key, instanceBox);
    return new IoCContainer(newMap);
  }
}
