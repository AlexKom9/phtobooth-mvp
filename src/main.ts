// import * as dotenv from "dotenv";
import { NestExpressApplication } from '@nestjs/platform-express';

require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger();

const port = process.env.PORT || 3001;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  await app.listen(port);
  logger.log(`Server was started at port ${port}`);
}

bootstrap();
