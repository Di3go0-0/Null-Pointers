import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ENV } from './shared';

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

  const config = new DocumentBuilder()
    .setTitle('Null Pointer')
    // .setDescription('T')
    .setVersion('1.0')
    .build();

  const rute = ENV.CONSTANS.SWAGGER_RUTE;

  SwaggerModule.setup(
    rute,
    app,
    SwaggerModule.createDocument(app, config, {
      deepScanRoutes: true,
    }),
  )

  const port = ENV.CONSTANS.API_PORT;
  console.log(`Swagger running on: localhost:${port}/${rute}`);

  await app.listen(port);
}
bootstrap();
