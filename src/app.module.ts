import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from 'auth/auth.module';
import { NotesModule } from 'notes/notes.module';
import { TagsModule } from 'tags/tags.module';
import { UsersModule } from 'users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { getMongoConfig } from './config/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    NotesModule,
    TagsModule,
    AuthModule,
    UsersModule,
    // TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
