import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { NestExpressApplication } from '@nestjs/platform-express';
import {SwaggerModule, DocumentBuilder} from "@nestjs/swagger"
import * as path from "path"
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  const config = new DocumentBuilder()
    .setTitle('Nest js product management')
    .setDescription('The product management api in nestjs')
    .setVersion('1.0')
    .addTag('Products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useStaticAssets(path.join(__dirname, '../uploads'))
  app.use(passport.initialize());
  await app.listen(3000);
}

bootstrap();

