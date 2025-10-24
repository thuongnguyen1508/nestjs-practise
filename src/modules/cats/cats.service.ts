import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  create(dto: CreateCatDto) {
    const cat: Cat = { id: uuid().replace(/-/g, '').slice(0, 24), ...dto };
    this.cats.push(cat);
    return cat;
  }

  findAll() {
    return this.cats;
  }

  findOne(id: string) {
    const cat = this.cats.find((c) => c.id === id);
    if (!cat) throw new NotFoundException('Cat not found');
    return cat;
  }

  update(id: string, dto: UpdateCatDto) {
    const cat = this.findOne(id);
    Object.assign(cat, dto);
    return cat;
  }

  remove(id: string) {
    const before = this.cats.length;
    this.cats = this.cats.filter((c) => c.id !== id);
    if (this.cats.length === before)
      throw new NotFoundException('Cat not found');
    return { deleted: true };
  }
}
