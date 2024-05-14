import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { useContainer } from 'class-validator';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
      disableErrorMessages: process.env.NODE_ENV === 'PRODUCTION',
    }),
  );
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
