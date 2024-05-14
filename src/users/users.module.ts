import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IsUserEmailAvailableValidator } from 'common/validators';

import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  providers: [UsersService, IsUserEmailAvailableValidator],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
