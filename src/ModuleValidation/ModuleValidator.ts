import { MayFailBox, ResultBox } from 'value-box-ts';
import { AbstractModuleValidationError } from './AbstractModuleValidationError';
import { Module } from '../di-system';

export class ModuleValidator {
  constructor(private module: Module) {}

  validate(): MayFailBox<AbstractModuleValidationError, Module> {
    return ResultBox.of(this.module);
  }
}
