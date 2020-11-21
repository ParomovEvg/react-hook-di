import React from 'react';
import { EmptyBox, MaybeBox, ResultBox } from 'value-box-ts';
import { InstancesContainer } from '../../di-system/IocContainer/IoCContainer.interface';
import { renderHook } from '@testing-library/react-hooks';
import { createUseInstanceBox } from './useInstanceBox';
import { createTestInstancesContainer } from '../useInstancesObjectBox/createTestInstancesContainer';

describe('useInstanceBox', () => {
  const { instancesContainer, token1, value1 } = createTestInstancesContainer();

  const context = React.createContext<MaybeBox<InstancesContainer>>(
    ResultBox.of(instancesContainer)
  );
  const useInstancesObjectBox = createUseInstanceBox(context);

  it('should return value result box from context', () => {
    const { result } = renderHook(() => useInstancesObjectBox(token1));
    const resValue = result.current.caseOf({
      result: r => r,
      empty: () => null,
      error: () => null,
    });

    expect(resValue).toEqual(value1);
  });

  it('should return empty box if instance not initialized', () => {
    const { result } = renderHook(() => useInstancesObjectBox('asdfasdf;a'));
    expect(result.current).toBeInstanceOf(EmptyBox);
  });
});
