import { Module } from '../di-system';

export class ValidationError {
  constructor(public readonly message: string, public readonly module: Module) {}
}
