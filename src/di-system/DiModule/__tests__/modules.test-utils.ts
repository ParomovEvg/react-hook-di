import { DiModule } from '../DiModule';

const module3Level = new DiModule({});
const module2Level1 = new DiModule({ imports: [module3Level] });
const module2Level2 = new DiModule({ imports: [module3Level] });
const module1Level = new DiModule({
  imports: [module2Level1, module2Level2],
});

export const testModules = {
  module3Level,
  module2Level2,
  module1Level,
  module2Level1,
};
