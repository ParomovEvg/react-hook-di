import { Module } from '../di-system';
import { MayFailBox } from 'value-box-ts';
import { ValidationError } from './ValidationError';

export interface Rule {
  test(module: Module): MayFailBox<ValidationError, Module>;
}
