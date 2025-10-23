import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.db',
      autoLoadEntities: true,
      synchronize: true, // dev only
    }),
    ItemsModule,
  ],
})
export class AppModule {}
