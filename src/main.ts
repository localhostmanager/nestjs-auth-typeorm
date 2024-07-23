import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerTags } from './constants/swagger-tags.constant';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger UI implementation
  const config = new DocumentBuilder()
    .setTitle('Typeorm API')
    .setDescription('')
    .setVersion('1.0')
    .addTag(SwaggerTags.USERS)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api');

  // Versioning
  app.enableVersioning({
    defaultVersion: ['1', '2'],
    type: VersioningType.URI
  });


  await app.listen(3000);
}
bootstrap();
