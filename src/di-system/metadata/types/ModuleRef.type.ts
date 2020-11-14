import { ForwardReference } from '../../../utils/types/forward-reference.type';
import { Module } from '../..';

export type ModuleRef = Module | ForwardReference<Module>;
