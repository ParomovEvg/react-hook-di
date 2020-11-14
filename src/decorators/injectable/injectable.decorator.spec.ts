import { Injectable } from './injectable.decorator';
import { MetadataService } from '../../di-system/MetadataService/MetadataService';

class Service1 {}
class Service2 {}

describe('Injectable decorator', () => {
  it('should add type metadata in class by key from MetadataService', () => {
    @Injectable()
    class TestService {
      constructor(public s1: Service1, public s2: Service2) {}
    }

    const res = Reflect.getMetadata(MetadataService.injectionTokensFromInjectable, TestService);
    expect(res).toEqual([Service1, Service2]);
  });
  it('should add empty array if empty parameters list', () => {
    @Injectable()
    class TestService {}
    const res = Reflect.getMetadata(MetadataService.injectionTokensFromInjectable, TestService);
    expect(res).toEqual([]);
  });
});
