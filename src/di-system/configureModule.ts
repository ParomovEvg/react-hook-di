import { DiModule } from './DiModule/DiModule';
import { ModuleMetadata } from './metadata/ModuleMetadata.type';
import { Module } from './DiModule/DiModule.interface';

export const configureModule = (metadata: ModuleMetadata): Module => {
  return new DiModule(metadata);
};
