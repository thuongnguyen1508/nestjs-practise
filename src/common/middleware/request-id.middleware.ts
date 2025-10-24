import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    // Try to use existing header or generate a new UUID
    const requestId = req.headers['x-request-id'] || uuidv4();
    // Attach to both request and response
    req.headers['x-request-id'] = requestId;
    res.header('x-request-id', requestId);
    next();
  }
}
