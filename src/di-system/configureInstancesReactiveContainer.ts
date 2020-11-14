import { InstancesFactory } from './InstancesFactory/InstancesFactory';
import { Module } from './DiModule/DiModule.interface';
import { InstanceReactiveContainer } from './InstancesFactory/InstancesFactory.interface';
import { MayFailBox } from 'value-box-ts';
import { AbstractModuleValidationError } from './ModuleValidation/AbstractModuleValidationError';
import { ModuleValidator } from './ModuleValidation/ModuleValidator';

export const configureInstancesReactiveContainer = (
  module: Module
): MayFailBox<AbstractModuleValidationError, InstanceReactiveContainer> => {
  return new ModuleValidator(module)
    .validate()
    .map(validModule => InstancesFactory.fromRootModule(validModule));
};
