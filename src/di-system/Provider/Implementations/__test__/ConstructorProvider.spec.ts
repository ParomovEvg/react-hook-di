import { createTestMetadataService } from './createTestMetadataService';
import { getTestProviderBaseFactory } from './getTestProviderBaseFactory';
import { renderHook } from '@testing-library/react-hooks';
import { ConstructorProvider } from '../ConstructorProvider';

describe('ConstructorProvider crate', () => {
  const token1 = 'token1';
  const token2 = 'token2';
  const metadataTokens = [token1, token2];
  class TestService {}

  const testProviderBaseFactory = getTestProviderBaseFactory();
  const metadataService = createTestMetadataService(metadataTokens);

  new ConstructorProvider(testProviderBaseFactory).create(TestService, metadataService);

  it('should call provider factory with provide from metadata', () => {
    expect(testProviderBaseFactory.parameters?.provide).toBe(TestService);
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
