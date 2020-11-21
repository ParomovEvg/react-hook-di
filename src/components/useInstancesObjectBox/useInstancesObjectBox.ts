import { TokensObject } from '../injectInstances/TokensObject';
import { InstancesContainerContext } from '../InstancesContainerContext';
import { useContext, useMemo } from 'react';
import { MaybeBox, mergeObjectOfBoxes, ValueBox } from 'value-box-ts';
import { mapObject } from '../../utils/mapObject/mapObject';
import { InstancesContainer } from '../../di-system/IocContainer/IoCContainer.interface';
import { ConstructError } from '../../errors/ConstructError';
import { InstanceNotFoundInContainer } from '../../exceptions/InstanceNotFoundInContainer';

function getInstancesFromContainerBox(
  instancesContainerBox: MaybeBox<InstancesContainer>,
  tokensObject: TokensObject
): ValueBox<ConstructError, Record<string, any>> {
  return instancesContainerBox.chain(instancesContainer => {
    const instancesBoxObject = mapObject(tokensObject, token => {
      const instance = instancesContainer.getInstance(token);
      if (!instance) InstanceNotFoundInContainer.throw(token);
      return instance;
    });
    return mergeObjectOfBoxes(instancesBoxObject);
  });
}

export const createUseInstancesObjectBox = (context = InstancesContainerContext) => (
  tokensObject: TokensObject
) => {
  const instancesContainerBox = useContext(context);
  return useMemo(() => getInstancesFromContainerBox(instancesContainerBox, tokensObject), [
    instancesContainerBox,
  ]);
};

export const useInstancesObjectBox = createUseInstancesObjectBox();
