import { Module } from '../../../di-system';

export function getModuleName(module: Module) {
  const metadata = module.getMetadata();
  return metadata.name;
}
