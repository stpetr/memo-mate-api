import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from 'auth/auth.module';
import { UsersService } from 'users/users.service';

import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { Tag, TagSchema } from './schemas/tag.schema';
import { User, UserSchema } from 'users/schemas/user.schema';

@Module({
  controllers: [TagsController],
  providers: [TagsService, UsersService],
  imports: [
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
  ],
})
export class TagsModule {}
