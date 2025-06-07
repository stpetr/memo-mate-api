import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

import { useContainer } from 'class-validator';

import { createCorsOptions } from 'common/helpers/cors.helper';

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

  const config = app.get(ConfigService);
  const rawOrigins = config.get<string>('CORS_ORIGIN', '');

  const corsOptions = createCorsOptions(rawOrigins);
  app.enableCors(corsOptions);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
