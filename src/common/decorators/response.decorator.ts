import { SetMetadata } from '@nestjs/common';
import {
  HTTP_RES_MESSAGE_METADATA,
  HTTP_RES_STATUS_METADATA,
} from 'src/constants/meta.constant';

export const ResponseMessage = (message: string) =>
  SetMetadata(HTTP_RES_MESSAGE_METADATA, message);

export const ResponseStatusCode = (status: number) =>
  SetMetadata(HTTP_RES_STATUS_METADATA, status);
