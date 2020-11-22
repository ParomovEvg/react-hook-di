import { ValidationError } from '../../module-validation/ValidationError';
import React from 'react';

interface ModuleValidationErrorProps {
  error: ValidationError;
}

export const ModuleValidationError: React.FC<ModuleValidationErrorProps> = p => {
  return <div>{p.error.message}</div>;
};
