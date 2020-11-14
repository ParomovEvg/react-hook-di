import { getTestProviderBaseFactory } from './getTestProviderBaseFactory';
import { renderHook } from '@testing-library/react-hooks';
import { ReactHookFactoryProvider } from '../ReactHookFactoryProvider';
import { ResultBox } from 'value-box-ts';
import { useEffect } from 'react';

describe('ClassProvider crate', () => {
  const token = 'token';
  const token1 = 'token1';
  const token2 = 'token2';
  const metadataTokens = [token1, token2];
  const instance = 'instance';

  const testProviderBaseFactory = getTestProviderBaseFactory();

  new ReactHookFactoryProvider(testProviderBaseFactory).create({
    useReactHookFactory: update => {
      useEffect(() => {
        update(ResultBox.of(instance));
      }, []);
    },
    provide: token,
    inject: metadataTokens,
  });

  it('should call provider factory with provide from metadata', () => {
    expect(testProviderBaseFactory.parameters?.provide).toBe(token);
  });

  it('should call provider factory with inject from metadataService', () => {
    expect(testProviderBaseFactory.parameters?.inject).toEqual(metadataTokens);
  });

  it('should call provider factory with useFactory with return classInstanceBox', () => {
    let res: any = '';
    const update = (v: any) => {
      res = v.getValue();
    };
    renderHook(() => testProviderBaseFactory.parameters?.useInstanceBox(update));
    expect(res).toBe(instance);
  });
});
