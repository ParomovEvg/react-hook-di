import { InjectionToken } from '../../..';
import { instance, mock, when } from 'ts-mockito';
import { MetadataService } from '../../../MetadataService/MetadataService';

export const createTestMetadataService = (returnTokens: InjectionToken[]) => {
  const metadataService = mock<MetadataService>();
  when(metadataService.scanDependencies).thenReturn(() => returnTokens);
  return instance(metadataService);
};
