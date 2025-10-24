import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

const objectIdRegex = /^[0-9a-fA-F]{24}$/; // Mongo-like ObjectId example

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string> {
  transform(value: string) {
    if (!objectIdRegex.test(value)) {
      throw new BadRequestException('Invalid ID format');
    }
    return value;
  }
}
