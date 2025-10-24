import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UppercasePipe implements PipeTransform<string, string> {
  transform(value: string): string {
    return typeof value === 'string' ? value.toUpperCase() : value;
  }
}
