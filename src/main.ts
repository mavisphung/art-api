import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { CustomAuthGuard } from './api/auth/auth.guard';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT, 10) || 8081;
  
  //validator
  app.useGlobalPipes(new ValidationPipe());

  //Exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Enable cors for front end
  app.enableCors();

  //Use custom guard to process authenticate user
  const reflector = app.get(Reflector); // global
  app.useGlobalGuards(
    // new JwtAuthGuard(),
    new CustomAuthGuard(reflector),
    // new RoleGuard(),
  );

  await app.listen(port);
  console.log(`Application is running on ${await app.getUrl()}`);
}

bootstrap();
