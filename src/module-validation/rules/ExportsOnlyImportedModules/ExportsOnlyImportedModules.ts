import { Module } from '../../../di-system';
import { MayFailBox } from 'value-box-ts';
import { ValidationError } from '../../ValidationError';
import { Rule } from '../../Rule';
import { DiModule } from '../../../di-system/DiModule/DiModule';
import { getErrorBox } from '../../analizators/main/getErrorBox';
import { getModuleName } from '../../analizators/main/getModuleName';

export class ExportsOnlyImportedModules implements Rule {
  test = (module: Module): MayFailBox<ValidationError, Module> => {
    const info = this.getErrorInfo(module);
    return getErrorBox(module, this.getError(info));
  };

  private getErrorInfo(module: Module): Module | undefined {
    const { moduleReExports = [], imports = [] } = module.getMetadata();
    const importsUnwrapped = imports.map(m => DiModule.unwrapModuleRef(m));
    const moduleReExportsUnwrapped = moduleReExports.map(m => DiModule.unwrapModuleRef(m));
    return moduleReExportsUnwrapped.find(exp => !importsUnwrapped.includes(exp));
  }

  private getError(errorInfo: Module | undefined): ValidationError | undefined {
    if (errorInfo) {
      const message = `expected no imported module "${getModuleName(errorInfo)}" export`;
      return new ValidationError(message, errorInfo);
    } else {
      return undefined;
    }
  }
}
