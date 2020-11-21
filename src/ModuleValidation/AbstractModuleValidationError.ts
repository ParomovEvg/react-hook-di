import { Module } from '../di-system';

export class AbstractModuleValidationError extends Error {
  constructor(message: string, public readonly module: Module) {
    super(message);
  }
}
