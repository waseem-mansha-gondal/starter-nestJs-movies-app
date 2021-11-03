/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.NODE_ENV);
  // global prefix
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('Movie example')
    .setBasePath('api/v1')
    .setDescription('The Movie API description')
    .setVersion('1.0')
    .addTag('movie')
    .addBearerAuth()
    .build();
  // https://app.swaggerhub.com/apis/gsoft8
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);

  await app.listen(3000);
}
bootstrap();
