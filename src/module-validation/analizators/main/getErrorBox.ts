import { Module } from '../../../di-system';
import { ValidationError } from '../../ValidationError';
import { ErrorBox, MayFailBox, ResultBox } from 'value-box-ts';

export function getErrorBox(
  module: Module,
  error?: ValidationError
): MayFailBox<ValidationError, Module> {
  if (error) {
    return ErrorBox.of(error);
  } else {
    return ResultBox.of(module);
  }
}
