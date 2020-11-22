import { InstancesFactory } from './InstancesFactory/InstancesFactory';
import { Module } from './DiModule/DiModule.interface';
import { InstancesReactiveFactory } from './InstancesFactory/InstancesReactiveFactory.interface';
import { MayFailBox } from 'value-box-ts';
import { ValidationError } from '../module-validation/ValidationError';
import { moduleValidator } from '../module-validation/ModuleValidator';

export const configureInstancesReactiveContainer = (
  module: Module
): MayFailBox<ValidationError, InstancesReactiveFactory> => {
  return moduleValidator
    .test(module)
    .map(validModule => InstancesFactory.fromRootModule(validModule));
};
