import {
  CACHE_KEY_METADATA,
  CACHE_TTL_METADATA,
} from '@nestjs/common/cache/cache.constants';

export const HTTP_CACHE_KEY_METADATA = CACHE_KEY_METADATA;
export const HTTP_CACHE_TTL_METADATA = CACHE_TTL_METADATA;
export const HTTP_CACHE_DISABLE = 'cache_module:cache_disable';
export const HTTP_RES_TRANSFORM_PAGINATE = '__customHttpResTransformPagenate__';
export const HTTP_RES_MESSAGE_METADATA = 'response_message';
export const HTTP_RES_STATUS_METADATA = 'response_status';
