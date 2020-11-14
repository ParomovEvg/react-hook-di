import { Provider } from '../Provider';
import { ProviderMetadata } from '../..';

export interface ProviderFactory {
  create(metadata: ProviderMetadata): Provider;
}
