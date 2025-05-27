import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ENV } from './shared';
import { SwaggerConfig } from './shared/swagger/swagger.config';

async function bootstrap() {
  const rute = ENV.CONSTANS.SWAGGER_RUTE;
  const port = ENV.CONSTANS.API_PORT || 3001;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )

  SwaggerModule.setup(
    rute,
    app,
    SwaggerModule.createDocument(app, SwaggerConfig.config, {
      deepScanRoutes: true,
    }),
  )

  console.log(`Swagger running on: localhost:${port}/${rute}`);
  app.enableCors(); // <-- Esto es clave
  await app.listen(port);
}
bootstrap();
