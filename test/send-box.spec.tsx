import { Injectable } from '../src/decorators/injectable/injectable.decorator';
import { Inject } from '../src/decorators/inject/inject.decorator';
import { InstancesFactory } from '../src/di-system/InstancesFactory/InstancesFactory';
import { renderHook } from '@testing-library/react-hooks';
import { configureModule } from '../src/di-system';

interface Connector {
  getString(): string;
}
const STORE_CONNECTOR = 'STORE_CONNECTOR';
class StoreConnector {
  constructor() {}
  getString() {
    return 'test hey';
  }
}

@Injectable()
class Logger {
  constructor(@Inject(STORE_CONNECTOR) private connector: Connector) {}
  log() {
    console.log(this.connector.getString());
  }
}

const loggerModule = configureModule({
  providers: [
    Logger,
    {
      provide: STORE_CONNECTOR,
      class: StoreConnector,
    },
  ],
  providerExports: [Logger],
});

abstract class Service1Abstract {
  abstract s1Log(): void;
}

class Service1 implements Service1Abstract {
  constructor(private logger: Logger) {}
  s1Log() {
    this.logger.log();
  }
}

@Injectable()
class Service2 {
  constructor(private service1: Service1Abstract) {}
  s2Log() {
    this.service1.s1Log();
  }
}

const mainModule = configureModule({
  providers: [
    {
      provide: Service1Abstract,
      factory: (logger: Logger) => new Service1(logger),
      inject: [Logger],
    },
    Service2,
  ],
  imports: [loggerModule],
  providerExports: [Service2],
});

test('send-box', () => {
  const instancesFactory = InstancesFactory.fromRootModule(mainModule);

  const { result } = renderHook(() => instancesFactory.useInstancesContainer());

  result.current.getInstance(Service1Abstract).map(r => r.s1Log());
  result.current.getInstance(Service2).map(r => r.s2Log());
  result.current.getInstance<Connector>(STORE_CONNECTOR).map(r => r.getString());
  result.current.getInstance(Logger).map(r => r.log());
  expect(true).toBe(true);
});
