import { MayFailBox, ResultBox } from 'value-box-ts';
import { ValidationError } from './ValidationError';
import { Module } from '../di-system';
import {RulesGroup} from "./RulesGroup/RulesGroup";
import {ExportsOnlyImportedModules} from "./rules/ExportsOnlyImportedModules/ExportsOnlyImportedModules";

export class ModuleValidator {
  constructor(private module: Module) {}

  validate(): MayFailBox<ValidationError, Module> {
    return ResultBox.of(this.module);
  }
}

export const moduleValidator = new RulesGroup([
    new ExportsOnlyImportedModules()
])
