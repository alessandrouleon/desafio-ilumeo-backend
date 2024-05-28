import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.DOCKER_PORT;

  app.enableCors();

  await app.listen(port);
  console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
