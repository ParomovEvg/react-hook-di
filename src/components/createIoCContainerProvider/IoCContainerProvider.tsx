import React, { useMemo } from 'react';
import { InstancesReactiveFactory } from '../../di-system/InstancesFactory/InstancesReactiveFactory.interface';
import { MaybeBox, ResultBox } from 'value-box-ts';
import { InstancesContainer } from '../../di-system/IocContainer/IoCContainer.interface';

export interface IoCContainerProviderProps {
  instancesReactiveFactory: InstancesReactiveFactory;
  context: React.Context<MaybeBox<InstancesContainer>>;
}

export const IoCContainerProvider: React.FC<IoCContainerProviderProps> = ({
  instancesReactiveFactory,
  children,
  context,
}) => {
  const instancesContainer = instancesReactiveFactory.useInstancesContainer();
  return (
    <context.Provider value={useMemo(() => ResultBox.of(instancesContainer), [instancesContainer])}>
      {children}
    </context.Provider>
  );
};
