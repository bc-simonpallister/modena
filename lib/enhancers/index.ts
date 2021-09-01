import { compose, EnhancerBuilder } from '@uniformdev/upm';
import { UPM_CONTENTFUL_PARAMETER_TYPES } from '@uniformdev/upm-contentful';
import { UPM_BIGCOMMERCE_PARAMETER_TYPES } from '@uniformdev/upm-bigcommerce';
import { contentfulEnhancer } from './contentful/contentfulEnhancer';
import { bigCommerceEnhancer } from './commerce/bigCommerceEnhancer';

const sysFieldCleanser = ({ parameter }) => {
  const entry = parameter.value;
  if (entry) {
    const returnValue = { ...entry.fields };
    // cleanFields(returnValue);
    return returnValue;
  }
  return parameter.value;
};

export const enhancers = new EnhancerBuilder()
  .parameterType(
    UPM_CONTENTFUL_PARAMETER_TYPES,
    // compose(contentfulEnhancer(), sysFieldCleanser)
    contentfulEnhancer()
  )
  .parameterType(UPM_BIGCOMMERCE_PARAMETER_TYPES, bigCommerceEnhancer());
