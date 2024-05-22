import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const TOKEN_EXPIRATION_TIME = '1d';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: TOKEN_EXPIRATION_TIME,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, ConfigService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
