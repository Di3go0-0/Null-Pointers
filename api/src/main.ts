import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ENV } from './shared';
import { SwaggerConfig } from './shared/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )

  const rute = ENV.CONSTANS.SWAGGER_RUTE;

  SwaggerModule.setup(
    rute,
    app,
    SwaggerModule.createDocument(app, SwaggerConfig.config, {
      deepScanRoutes: true,
    }),
  )

  const port = ENV.CONSTANS.API_PORT;
  console.log(`Swagger running on: localhost:${port}/${rute}`);

  await app.listen(port);
}
bootstrap();
