import { Inject } from './inject.decorator';
import { MetadataService } from '../../di-system/MetadataService/MetadataService';

interface I1 {}
const injectionToken1 = 'injection token 1';
const injectionToken2 = Symbol('injection token 2');

describe('inject decorator', () => {
  class Service {
    constructor(
      @Inject(injectionToken1) public value1: I1,
      @Inject(injectionToken2) public value2: string
    ) {}
  }

  it('should add injection token in class by key from MetadataService', () => {
    const res = MetadataService.getTokensFromInject(Service);

    expect(res).toEqual({ 0: injectionToken1, 1: injectionToken2 });
  });
});
