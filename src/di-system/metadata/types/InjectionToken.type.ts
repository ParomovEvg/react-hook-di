import { Type } from '../../../utils/types/Type.type';
import { Abstract } from '../../../utils/types/Abstract.type';

export type InjectionToken = string | symbol | Type<any> | Abstract<any> | Function;
