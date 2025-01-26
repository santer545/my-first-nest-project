import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product';
import { ProductModule } from './products/module/product/product.module';
import { UserModule } from './users/module/user/user.module';
import { User } from './entities/user';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './middleware/auth/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '_kO&businka1000',
      database: 'nestmysql',
      entities: [Product, User],
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'It is a secret.',
      signOptions: { expiresIn: '60m' },
    }),
    ProductModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'user/login', method: RequestMethod.ALL },
        { path: 'mystore/sign-up', method: RequestMethod.ALL },
        { path: 'user/logout', method: RequestMethod.ALL },
        { path: 'user/sign-up', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
