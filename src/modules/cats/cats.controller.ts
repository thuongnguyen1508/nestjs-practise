import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { UppercasePipe } from 'src/common/pipes/uppercase.pipe';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-objectid.pipe';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ApiHeaders } from 'src/common/decorators/api-key-header.decorator';

@Controller('cats')
@UseGuards(ApiKeyGuard)
@ApiHeaders()
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() dto: CreateCatDto) {
    // You can log or attach user-agent for analytics
    return this.catsService.create({ ...dto });
  }

  @Get()
  findAll() {
    const result = this.catsService.findAll();
    return result;
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.catsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateCatDto,
  ) {
    return this.catsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.catsService.remove(id);
  }
}
