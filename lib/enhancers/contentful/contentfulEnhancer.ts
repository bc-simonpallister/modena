import getConfig from 'next/config';
import { createContentfulEnhancer } from '@uniformdev/upm-contentful';
import { createClient } from 'contentful';

const { serverRuntimeConfig } = getConfig();
const { contentfulSpaceId, contentfulDeliveryToken, contentfulPreviewToken } = serverRuntimeConfig;

if (!contentfulSpaceId) {
  throw new Error('CONTENTFUL_SPACE_ID env not set.');
}

if (!contentfulDeliveryToken) {
  throw new Error('CONTENTFUL_CDA_ACCESS_TOKEN env not set.');
}

if (!contentfulPreviewToken) {
  throw new Error('CONTENTFUL_CDA_ACCESS_TOKEN env not set.');
}

const contentfulEnvironment = process.env.CONTENTFUL_ENVIRONMENT ?? 'master';

export const contentfulEnhancer = () => {
  const client = createClient({
    space: contentfulSpaceId,
    environment: contentfulEnvironment,
    accessToken: contentfulDeliveryToken,
  });

  const previewClient = createClient({
    space: contentfulSpaceId,
    environment: contentfulEnvironment,
    accessToken: contentfulPreviewToken,
    host: 'preview.contentful.com',
  });

  return createContentfulEnhancer({
    client,
    previewClient,
    useBatching: true,
    createQuery: ({ parameterName, defaultQuery }) => {
      return {
        ...defaultQuery,
        select: 'fields',
        include: 2,
      };
      // example of overriding Contentful API params
      // for a specific parameter
      // if (parameterName === 'colour') {
      //   return {
      //     ...defaultQuery,
      //     include: 0,
      //   };
      // }
    },
  });
};
