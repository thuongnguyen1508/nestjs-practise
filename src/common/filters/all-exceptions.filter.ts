import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

type Error = {
  readonly status: number;
  readonly statusCode?: number;
  readonly message?: string;
  readonly _message?: string;
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<FastifyReply>();
    const req = ctx.getRequest<FastifyRequest>();

    if (req.method === 'OPTIONS') {
      return res.status(HttpStatus.OK).send();
    }

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : (exception as any)?.response?.status ||
          (exception as any)?.response?.statusCode ||
          (exception as any)?.status ||
          (exception as any)?.statusCode ||
          HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      (exception as any)?.response?.message ||
      (exception as Error)?.message ||
      (exception as Error)?._message ||
      'Unknown Error';

    const errors = (exception as any)?.response?.errors || [];

    res.code(statusCode).send({
      status: statusCode,
      statusCode: statusCode,
      message,
      errors,
    });
  }
}
