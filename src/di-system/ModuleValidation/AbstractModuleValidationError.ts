import { Module } from '..';

export class AbstractModuleValidationError extends Error {
  constructor(message: string, public readonly module: Module) {
    super(message);
  }
}
