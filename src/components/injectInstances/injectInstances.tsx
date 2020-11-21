import React from 'react';
import { ExtractInjectionTokenInstance } from '../../di-system/IocContainer/IoCContainer.interface';
import { ConstructError } from '../../errors/ConstructError';
import { TokensObject } from './TokensObject';
import { RenderValueBox } from '../RenderValueBox/RenderValueBox';
import { createUseInstancesObjectBox } from '../useInstancesObjectBox/useInstancesObjectBox';
import { InstancesContainerContext } from '../InstancesContainerContext';

type ComponentWithInjectedItemsProps<C extends TokensObject> = {
  [K in keyof C]: ExtractInjectionTokenInstance<C[K]>;
};

type OmitTokensFields<T extends TokensObject, O extends Record<keyof T, unknown>> = Omit<
  O,
  keyof T
>;

type WrappedComponentPops<
  T extends TokensObject,
  C extends ComponentWithInjectedItemsProps<T>
> = OmitTokensFields<T, C> & {
  error?: (e: ConstructError) => JSX.Element;
  empty?: () => JSX.Element;
};

export const createInjectInstances = (context = InstancesContainerContext) => {
  const useInstancesObjectBox = createUseInstancesObjectBox(context);

  return function injectInstances<T extends TokensObject>(tokens: T) {
    return function<P extends ComponentWithInjectedItemsProps<T>>(
      component: React.ComponentType<P>
    ) {
      const Component = component as any;
      const InstancesContainerConsumer: React.FC<WrappedComponentPops<T, P>> = ({
        error,
        empty,
        ...props
      }) => {
        const instancesBox = useInstancesObjectBox(tokens);
        return (
          <RenderValueBox error={error} empty={empty} box={instancesBox}>
            {e => <Component {...props} {...e} />}
          </RenderValueBox>
        );
      };
      return InstancesContainerConsumer;
    };
  };
};

export const injectInstances = createInjectInstances();
