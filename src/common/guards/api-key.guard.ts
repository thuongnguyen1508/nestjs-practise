import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly validApiKeys: string[] = [];
  constructor(private readonly configService: ConfigService) {
    const appKey = this.configService.get<string>('app.appKey'); // Explicitly type as string
    if (typeof appKey !== 'string') {
      throw new Error('app.appKey must be a string in configuration');
    }
    this.validApiKeys = appKey.split(', ');
  }
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const apiKey = req.headers['x-api-key'] as string | undefined;
    if (!apiKey || !this.validApiKeys.includes(apiKey)) {
      throw new UnauthorizedException('Invalid or missing API key');
    }
    return true;
  }
}
