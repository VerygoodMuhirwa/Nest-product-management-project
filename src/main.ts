import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from "path"
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(path.join(__dirname, '../uploads'))
  app.use(passport.initialize());
  await app.listen(3000);
}

bootstrap();

