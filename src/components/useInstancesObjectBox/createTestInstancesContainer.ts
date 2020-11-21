import { InstancesContainer } from '../../di-system/IocContainer/IoCContainer.interface';
import { InjectionToken } from '../../di-system';
import { InstanceBox } from '../../di-system/IocContainer/InstanceBox';
import { EmptyBox, ErrorBox, ResultBox } from 'value-box-ts';
import { ConstructError } from '../../errors/ConstructError';

export const createTestInstancesContainer = () => {
  const token1 = 'token1';
  const token2 = 'token2';
  const tokenError = 'tokenError';

  const value1 = 'value1';
  const value2 = 'value2';
  const errorMessage = 'errorMessage';

  const instancesContainer: InstancesContainer = {
    getInstance(token: InjectionToken): InstanceBox {
      if (token === token1) {
        return ResultBox.of(value1);
      }
      if (token === token2) {
        return ResultBox.of(value2);
      }
      if (token === tokenError) {
        return ErrorBox.of(new ConstructError(errorMessage));
      }
      return EmptyBox.get();
    },
  };

  return { instancesContainer, tokenError, token1, token2, value1, value2, errorMessage };
};
