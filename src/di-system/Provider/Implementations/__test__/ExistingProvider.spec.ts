import { getTestProviderBaseFactory } from './getTestProviderBaseFactory';
import { ExistingProvider } from '../ExistingProvider';

describe('ExistingProvider crate', () => {
  const token = 'token';
  const token1 = 'token1';

  const testProviderBaseFactory = getTestProviderBaseFactory();

  new ExistingProvider(testProviderBaseFactory).create({ provide: token, existing: token1 });

  it('should call provider factory with provide from metadata', () => {
    expect(testProviderBaseFactory.parameters?.provide).toBe(token);
  });
  it('should call provider factory with inject with existing token', () => {
    expect(testProviderBaseFactory.parameters?.inject).toEqual([token1]);
  });
});
