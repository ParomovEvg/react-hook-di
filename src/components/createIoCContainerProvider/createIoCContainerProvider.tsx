import { configureInstancesReactiveContainer, Module } from '../../di-system';
import { ModuleValidationError } from './ModuleValidationError';
import { IoCContainerProvider } from './IoCContainerProvider';
import React from 'react';
import { InstancesContainerContext } from '../InstancesContainerContext';

export const createIoCContainerProvider = (module: Module, context = InstancesContainerContext) => {
  const ioCReactiveContainerBox = configureInstancesReactiveContainer(module);

  return ioCReactiveContainerBox.caseOf({
    error: error => () => <ModuleValidationError error={error} />,
    result: instancesFactory => () => (
      <IoCContainerProvider context={context} instancesReactiveFactory={instancesFactory} />
    ),
  });
};
