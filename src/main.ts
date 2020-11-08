import * as dotenv from "dotenv";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

dotenv.config();


const logger = new Logger()

const port = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  logger.log(`Server was started at port ${port}`)
}

bootstrap();
