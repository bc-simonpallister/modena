import { UpmClient } from '@uniformdev/upm';
import getConfig from 'next/config';

const {
  serverRuntimeConfig: { presentationApiToken, presentationApiHost },
} = getConfig();

export const upmClient = new UpmClient({
  apiKey: presentationApiToken,
  apiHost: presentationApiHost,
});
