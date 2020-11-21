import { AbstractModuleValidationError } from '../../ModuleValidation/AbstractModuleValidationError';
import React from 'react';

interface ModuleValidationErrorProps {
  error: AbstractModuleValidationError;
}

export const ModuleValidationError: React.FC<ModuleValidationErrorProps> = p => {
  return <div>{p.error.message}</div>;
};
