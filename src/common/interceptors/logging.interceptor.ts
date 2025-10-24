import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Only act on HTTP requests
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const isDev = this.configService.get<string>('app.env') === 'development';
    if (!isDev) {
      return next.handle();
    }

    const http = context.switchToHttp();
    const req = http.getRequest(); // works for both Express & Fastify adapters
    const res = http.getResponse();

    const start = Date.now();
    const method: string = req.method;
    const url: string = req.originalUrl ?? req.url;

    // Status code may not be set yet; we’ll read it after the response finishes
    return next.handle().pipe(
      tap({
        next: () => {
          const ms = Date.now() - start;
          const status = res.statusCode;
          Logger.log(
            `${method} ${url} ${status} - ${ms}ms`,
            HttpLoggingInterceptor.name,
          );
        },
        error: (err) => {
          const ms = Date.now() - start;
          const status =
            res.statusCode ?? err?.status ?? err?.statusCode ?? 500;
          Logger.error(
            `${method} ${url} ${status} - ${ms}ms :: ${err?.message ?? 'Error'}`,
            err?.stack,
            HttpLoggingInterceptor.name,
          );
        },
      }),
      // ensure stream continues error propagation
      catchError((e) => {
        throw e;
      }),
    );
  }
}
