import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { API_KEY_HEADER } from 'src/constants/system.constants';
export function ApiHeaders() {
  return applyDecorators(
    ApiHeader({
      name: API_KEY_HEADER,
      description: 'Api Key',
    }),
  );
}
