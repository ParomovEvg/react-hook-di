import {ResultBox} from 'value-box-ts';
import {renderHook} from '@testing-library/react-hooks';

import {InstancesFactory} from '../InstancesFactory';
import {IoCContainer} from '../../IocContainer/IoCContainer';
import {TestProvider} from "./TestProvider";

describe('InstanceReactiveContainer useIoCContainer', () => {
  const container = new IoCContainer(new Map());
  const tokens = ['token1', 'token2', 'token3'];
  const providers = tokens.map(token => new TestProvider(token));
  const instancesFactory = new InstancesFactory(providers, container);

  it('should return IoCContainer with providers results', () => {
    const { result } = renderHook(() => instancesFactory.useInstancesContainer());

    const container = result.current;

    const res = tokens
      .map(token => container.getInstance(token) as ResultBox<string>)
      .map(r => r.getValue());

    expect(res).toEqual(tokens);
  });
});
