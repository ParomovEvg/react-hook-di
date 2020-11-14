import { MetadataService } from '../../MetadataService/MetadataService';
import { ProviderMetadata } from '../..';
import { Provider } from '../Provider';
import { ClassProvider } from '../Implementations/ClassProvider';
import { ValueProvider } from '../Implementations/ValueProvider';
import { FactoryProvider } from '../Implementations/FactoryProvider';
import { ReactHookFactoryProvider } from '../Implementations/ReactHookFactoryProvider';
import { ExistingProvider } from '../Implementations/ExistingProvider';
import { ConstructorProvider } from '../Implementations/ConstructorProvider';
import { ProviderFactory } from './ProviderFactory';
import { ProviderBase } from '../Implementations/ProviderBase';

export class ProviderFactoryImpl implements ProviderFactory {
  constructor(private metadataScanner: MetadataService) {}

  create(metadata: ProviderMetadata): Provider {
    if ('class' in metadata) {
      return new ClassProvider(ProviderBase.create).create(metadata, this.metadataScanner);
    } else if ('value' in metadata) {
      return new ValueProvider(ProviderBase.create).create(metadata);
    } else if ('factory' in metadata) {
      return new FactoryProvider(ProviderBase.create).create(metadata);
    } else if ('useReactHookFactory' in metadata) {
      return new ReactHookFactoryProvider(ProviderBase.create).create(metadata);
    } else if ('existing' in metadata) {
      return new ExistingProvider(ProviderBase.create).create(metadata);
    } else {
      return new ConstructorProvider(ProviderBase.create).create(metadata, this.metadataScanner);
    }
  }
}
