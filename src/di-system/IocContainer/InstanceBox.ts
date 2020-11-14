import { ValueBox } from 'value-box-ts';
import { ConstructError } from '../../errors/ConstructError';

export type InstanceBox<T = any> = ValueBox<ConstructError, T>;
