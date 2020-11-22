import { configureModule } from '../../../di-system';
import { ExportsOnlyImportedModules } from './ExportsOnlyImportedModules';
import { extractBox } from '../../../utils/test-utils/extractBox';
import {ValidationError} from "../../ValidationError";

describe('ExportsOnlyImportedModules', () => {
  const moduleToImport1 = configureModule({
    name: 'moduleToImport1',
  });

  const validator = new ExportsOnlyImportedModules();

  it('should return module box if all right', () => {
    const module = configureModule({
      name: 'module',
      imports: [moduleToImport1],
      moduleReExports: [moduleToImport1],
    });
    const res = validator.test(module);
    expect(extractBox(res)).toEqual(module);
  });

  it('should return error if the rule is broken ', () => {
    const module = configureModule({
      name: 'module',
      imports: [],
      moduleReExports: [moduleToImport1],
    });
    const res = validator.test(module);
    expect(extractBox(res)).toBeInstanceOf(ValidationError);
  });
});
