import { ClassProvider } from '../ClassProvider';
import { createTestMetadataService } from './createTestMetadataService';
import { getTestProviderBaseFactory } from './getTestProviderBaseFactory';
import { renderHook } from '@testing-library/react-hooks';

describe('ClassProvider crate', () => {
  const token = 'token';
  const token1 = 'token1';
  const token2 = 'token2';
  const metadataTokens = [token1, token2];
  class TestService {}

  const testProviderBaseFactory = getTestProviderBaseFactory();
  const metadataService = createTestMetadataService(metadataTokens);

  new ClassProvider(testProviderBaseFactory).create(
    { class: TestService, provide: token },
    metadataService
  );

  it('should call provider factory with provide from metadata', () => {
    expect(testProviderBaseFactory.parameters?.provide).toBe(token);
  });

  it('should call provider factory with inject from service metadata', () => {
    expect(testProviderBaseFactory.parameters?.inject).toEqual(metadataTokens);
  });

  it('should call provider factory with useFactory with return classInstanceBox', () => {
    let classInstance: any = '';
    const update = (v: any) => {
      classInstance = v.getValue();
    };
    renderHook(() => testProviderBaseFactory.parameters?.useInstanceBox(update));
    expect(classInstance).toBeInstanceOf(TestService);
  });
});
