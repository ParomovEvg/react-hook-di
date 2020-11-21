import { createUseInstancesObjectBox } from './useInstancesObjectBox';
import React from 'react';
import { EmptyBox, MaybeBox, ResultBox } from 'value-box-ts';
import { InstancesContainer } from '../../di-system/IocContainer/IoCContainer.interface';
import { renderHook } from '@testing-library/react-hooks';
import { createTestInstancesContainer } from './createTestInstancesContainer';

describe('useInstancesObjectBox', () => {
  const { value1, token2, token1, instancesContainer, value2 } = createTestInstancesContainer();

  const context = React.createContext<MaybeBox<InstancesContainer>>(
    ResultBox.of(instancesContainer)
  );
  const useInstancesObjectBox = createUseInstancesObjectBox(context);

  it('should return object of values from context', () => {
    const { result } = renderHook(() => useInstancesObjectBox({ key1: token1, key2: token2 }));
    const resValue = result.current.caseOf({
      result: r => r,
      empty: () => null,
      error: () => null,
    });

    expect(resValue).toEqual({ key1: value1, key2: value2 });
  });

  it('should return empty box if instance not initialized', () => {
    const { result } = renderHook(() => useInstancesObjectBox({ key1: token1, key3: 'notototot' }));
    expect(result.current).toBeInstanceOf(EmptyBox);
  });
});
