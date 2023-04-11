import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { Tag, TagSchema } from './schemas/tag.schema';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
})
export class TagsModule {}
