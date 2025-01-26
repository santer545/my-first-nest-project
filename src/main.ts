import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as methodOverride from 'method-override';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
const MySQLStore = require('express-mysql-session')(session);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(methodOverride('_method'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  const options = {
    connectionLimit: 10,
    port: 3306,
    host: 'localhost',
    database: 'nestmysql',
    user: 'root',
    password: '_kO&businka1000',
    createDatabaseTable: true,
  };
  const sessionStore = new MySQLStore(options);
  app.use(
    session({
      secret: 'it is s secret',
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
    }),
  );
  app.use(cookieParser());
  app.setViewEngine('ejs');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
