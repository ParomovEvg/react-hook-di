import { MayFailBox, ResultBox } from 'value-box-ts';
import { ModuleExportsError } from './ModuleExportsError';
import { Module } from '../..';

export class ModuleExportsValidator {
  constructor(private module: Module) {}

  validate(): MayFailBox<ModuleExportsError, Module> {
    return ResultBox.of(this.module);
  }
}
