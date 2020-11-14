import { getTestProviderBaseFactory } from './getTestProviderBaseFactory';
import { renderHook } from '@testing-library/react-hooks';
import { ValueProvider } from '../ValueProvider';

describe('ValueProvider crate', () => {
  const token = 'token';
  const value = 'value';

  const testProviderBaseFactory = getTestProviderBaseFactory();

  new ValueProvider(testProviderBaseFactory).create({ provide: token, value: value });

  it('should call provider factory with provide from metadata', () => {
    expect(testProviderBaseFactory.parameters?.provide).toBe(token);
  });

  it('should call provider factory with useFactory with return value box', () => {
    let res: any = '';
    const update = (v: any) => {
      res = v.getValue();
    };
    renderHook(() => testProviderBaseFactory.parameters?.useInstanceBox(update));
    expect(res).toBe(value);
  });
});
