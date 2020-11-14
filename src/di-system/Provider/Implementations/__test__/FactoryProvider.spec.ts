import { getTestProviderBaseFactory } from './getTestProviderBaseFactory';
import { renderHook } from '@testing-library/react-hooks';
import { FactoryProvider } from '../FactoryProvider';

describe('FactoryProvider crate', () => {
  const token = 'token';
  const token1 = 'token1';
  const token2 = 'token2';
  const injectTokens = [token1, token2];
  const instance = 'instance';

  const testProviderBaseFactory = getTestProviderBaseFactory();

  new FactoryProvider(testProviderBaseFactory).create({
    provide: token,
    factory: () => instance,
    inject: injectTokens,
  });

  it('should call provider factory with provide from metadata', () => {
    expect(testProviderBaseFactory.parameters?.provide).toBe(token);
  });

  it('should call provider factory with inject from metadataService', () => {
    expect(testProviderBaseFactory.parameters?.inject).toEqual(injectTokens);
  });

  it('should call provider factory with useFactory witch return InstanceBox', () => {
    let res: any = '';
    const update = (v: any) => {
      res = v.getValue();
    };
    renderHook(() => testProviderBaseFactory.parameters?.useInstanceBox(update));
    expect(res).toBe(instance);
  });
});
