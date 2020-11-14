import { InstanceBox } from '../../IocContainer/InstanceBox';

export type UseInstanceBox<T = any> = (
  update: (instanceBox: InstanceBox<T>) => void,
  ...args: InstanceBox[]
) => void;
