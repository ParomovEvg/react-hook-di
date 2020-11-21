import { InstancesContainerContext } from '../InstancesContainerContext';
import { InjectionToken } from '../../di-system';
import { InstanceBox } from '../../di-system/IocContainer/InstanceBox';
import {
  ExtractInjectionTokenInstance,
  InstancesContainer,
} from '../../di-system/IocContainer/IoCContainer.interface';
import { useContext, useMemo } from 'react';
import { MaybeBox, ValueBox } from 'value-box-ts';
import { ConstructError } from '../../errors/ConstructError';

function getInstanceFromContainerBox(
  instancesContainerBox: MaybeBox<InstancesContainer>,
  token: InjectionToken
): ValueBox<ConstructError, any> {
  return instancesContainerBox.chain(instancesContainer => {
    return instancesContainer.getInstance(token);
  });
}

export const createUseInstanceBox = (context = InstancesContainerContext) => <
  T extends InjectionToken
>(
  token: T
): InstanceBox<ExtractInjectionTokenInstance<T>> => {
  const instancesContainerBox = useContext(context);
  return useMemo(() => getInstanceFromContainerBox(instancesContainerBox, token), [
    instancesContainerBox,
  ]);
};

export const useInstanceBox = createUseInstanceBox();
