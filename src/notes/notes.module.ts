import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from 'auth/auth.module';
import { Tag, TagSchema } from 'tags/schemas/tag.schema';
import { User, UserSchema } from 'users/schemas/user.schema';

import { UsersService } from 'users/users.service';

import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note, NoteSchema } from './schemas/note.schema';

@Module({
  controllers: [NotesController],
  providers: [NotesService, UsersService],
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
  ],
})
export class NotesModule {}
