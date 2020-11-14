import { InjectionToken } from '..';
import { InstanceBox } from './InstanceBox';
import { Type } from '../../utils/types/Type.type';
import { Abstract } from '../../utils/types/Abstract.type';

export type ExtractInjectionTokenInstance<T> = T extends Type<infer I>
  ? I
  : T extends Abstract<infer I2>
  ? I2
  : any;

export interface InstancesContainer {
  getInstance<T extends InjectionToken = any>(
    token: T
  ): InstanceBox<ExtractInjectionTokenInstance<T>>;
  getInstance<T = any>(token: InjectionToken): InstanceBox<T>;
}

export interface UpdatableInstanceContainer {
  immutableUpdate(
    key: InjectionToken,
    instanceBox: InstanceBox
  ): InstancesContainer & UpdatableInstanceContainer;
}
