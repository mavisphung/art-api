import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT, 10) || 8081;
  
  //validator
  app.useGlobalPipes(new ValidationPipe());

  //Exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(port);
  console.log(`App is running on ${port}...`);
}

bootstrap();
