import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { useContainer } from 'class-validator';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
      disableErrorMessages: process.env.NODE_ENV === 'PRODUCTION',
    }),
  );

  // @todo refactor to take allowed origin(s) from .env file
  // app.set('trust proxy', true);
  app.enableCors({
    origin: ['https://memomate.petes-bits.com'],
    methods: 'GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
