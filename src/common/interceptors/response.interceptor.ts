import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isArrayLike } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  HTTP_RES_MESSAGE_METADATA,
  HTTP_RES_STATUS_METADATA,
} from 'src/constants/meta.constant';

export interface Response<T> {
  message: string;
  statusCode: number;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private readonly reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    if (!context.switchToHttp().getRequest()) {
      return next.handle() as Observable<Response<T>>;
    }

    const handler = context.getHandler();

    return next.handle().pipe(
      map((data) => {
        const message =
          this.reflector.get(HTTP_RES_MESSAGE_METADATA, handler) || '';
        const statusCode =
          this.reflector.get(HTTP_RES_STATUS_METADATA, handler) || 200;

        return {
          message,
          statusCode,
          data: isArrayLike(data) ? [...data] : data,
        };
      }),
    );
  }
}
