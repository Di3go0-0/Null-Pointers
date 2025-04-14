import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

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

  SwaggerModule.setup(
    'api/null-pointers/docs',
    app,
    SwaggerModule.createDocument(app, config, {
      deepScanRoutes: true,
    }),
  )

  const port = process.env.API_PORT || 3000;
  console.log(process.env.API_PORT);

  await app.listen(port);
}
bootstrap();
