import { renderHook } from '@testing-library/react-hooks';
import { ProviderBase } from '../ProviderBase';
import { EmptyBox, ResultBox } from 'value-box-ts';
import { instance, mock, when } from 'ts-mockito';
import { InstancesContainer } from '../../../IocContainer/IoCContainer.interface';
import { useEffect } from 'react';
import { InstanceBox } from '../../../IocContainer/InstanceBox';

describe('ProviderBase', () => {
  const token = 'token';
  const token1 = 'token1';
  const token2 = 'token2';

  describe('getInjectionToken', () => {
    it('should return token passed to constructor', () => {
      const provider = new ProviderBase(token, [], () => EmptyBox.get());
      expect(provider.getInjectionToken()).toBe(token);
    });
  });

  describe('useInstanceFactory', () => {
    const instance1 = ResultBox.of(token1);
    const instance2 = ResultBox.of(token2);
    const containerMock = mock<InstancesContainer>();

    when(containerMock.getInstance(token1)).thenReturn(instance1);
    when(containerMock.getInstance(token2)).thenReturn(instance2);

    const container = instance(containerMock);

    it('should call factory hook with injected instances from container', () => {
      const factory = jest.fn();
      const provider = new ProviderBase(token, [token1, token2], (_, ...i) => factory(...i));
      renderHook(() => provider.useInstanceFactory(container, () => {}));

      expect(factory).toBeCalledWith(instance1, instance2);
    });

    it('should call updateInstance callback with factory hook result', () => {
      const useFactory = (update: (v: InstanceBox) => void) => {
        useEffect(() => {
          update(instance1);
        }, []);
      };
      const provider = new ProviderBase(token, [token1, token2], useFactory);

      renderHook(() => provider.useInstanceFactory(container, () => {}));
    });
  });
});
