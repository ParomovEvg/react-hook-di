import { createTestInstancesContainer } from '../useInstancesObjectBox/createTestInstancesContainer';
import React from 'react';
import { MaybeBox, ResultBox } from 'value-box-ts';
import { InstancesContainer } from '../../di-system/IocContainer/IoCContainer.interface';
import { createInjectInstances } from './injectInstances';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ConstructError } from '../../errors/ConstructError';

describe('injectInstances', () => {
  const {
    instancesContainer,
    token1,
    token2,
    value1,
    value2,
    errorMessage,
    tokenError,
  } = createTestInstancesContainer();
  const context = React.createContext<MaybeBox<InstancesContainer>>(
    ResultBox.of(instancesContainer)
  );
  const injectInstances = createInjectInstances(context);

  const TestComponent: React.FC<{ key1: any; key2: any; testProp: string }> = ({ key1, key2 }) => {
    return (
      <div>
        <div>{key1}</div>
        <div>{key2}</div>
      </div>
    );
  };

  const errorConstructor = (e: ConstructError) => {
    return <div>{e.message}</div>;
  };

  const defaultText = 'default';
  const defaultConstructor = () => {
    return <div>{defaultText}</div>;
  };

  it('should render component with values from container', async () => {
    const TestContainer = injectInstances({ key1: token1, key2: token2 })(TestComponent);
    const container = render(<TestContainer testProp={'text'} />);

    expect(await container.findByText(value1)).toHaveTextContent(value1);
    expect(await container.findByText(value2)).toHaveTextContent(value2);
  });

  it('should render empty placeholder if no instance by token in container', async () => {
    const TestContainer = injectInstances({ key1: token1, key2: 'asdfasf' })(TestComponent);

    const container = render(<TestContainer testProp={'asfd'} empty={defaultConstructor} />);

    expect(await container.findByText(defaultText)).toHaveTextContent(defaultText);
  });

  it('should render error placeholder if no instance constructed  with error', async () => {
    const TestContainer = injectInstances({ key1: token1, key2: tokenError })(TestComponent);

    const container = render(<TestContainer testProp={'asfd'} error={errorConstructor} />);
    expect(await container.findByText(errorMessage)).toHaveTextContent(errorMessage);
  });
});
