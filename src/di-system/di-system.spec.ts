import { configureModule } from './configureModule';
import { configureInstancesReactiveContainer } from './configureInstancesReactiveContainer';
import { Injectable } from '../decorators/injectable/injectable.decorator';
import { renderHook } from '@testing-library/react-hooks';
import { ResultBox } from 'value-box-ts';

interface ILogger {
  log(v: string): void;
}

class FetchLogger implements ILogger {
  log(v: string): void {
    console.log(v);
  }
}
class ConsoleLogger implements ILogger {
  log(v: string): void {
    console.log(v);
  }
}

const utilityModule = configureModule({
  name: 'utilityModule',
  providers: [FetchLogger, ConsoleLogger],
  providerExports: [FetchLogger, ConsoleLogger],
});

@Injectable()
class StoreService {
  constructor(logger: ILogger) {
    logger.log('hey');
  }
}

const storeModule = configureModule({
  name: 'storeModule',
  imports: [utilityModule],
  providers: [
    {
      provide: StoreService,
      factory: (logger: FetchLogger) => new StoreService(logger),
      inject: [FetchLogger],
    },
  ],
  providerExports: [StoreService],
});

@Injectable()
class DomainService {
  constructor(store: StoreService) {
    console.log(store);
  }
}

const domainModule = configureModule({
  name: 'domainModule',
  imports: [storeModule],
  providers: [DomainService],
});

test('si-system', () => {
  const instancesContainerBox = configureInstancesReactiveContainer(domainModule);

  const instancesContainer = instancesContainerBox
    .catch(e => {
      throw e;
    })
    .getValue();

  const { result } = renderHook(() => instancesContainer.useInstancesContainer());

  const domainService = result.current.getInstance(DomainService) as ResultBox<any>;
  expect(domainService.getValue()).toBeInstanceOf(DomainService);
});
