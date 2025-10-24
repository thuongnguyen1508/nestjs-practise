import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateCatDto {
  @ApiProperty({ example: 'Whiskers' })
  @IsString()
  name: string;

  @ApiProperty({ example: 3 })
  @IsInt()
  @Min(0)
  @Max(40)
  age: number;

  @ApiPropertyOptional({ example: 'British Shorthair' })
  @IsString()
  @IsOptional()
  breed?: string;
}
