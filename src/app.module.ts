import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { AuthController } from './auth/auth.controller';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { TokenMiddleware } from './middleware/token.middleware';
import { ContentTypeMiddleware } from './middleware/content-type.middleware';
import { ClientsController } from './clients/clients.controller';
import { convertMidlleware } from './middleware/convert.middleware';
import { UserService } from './services/user/user.service';
import { UserLoggingMiddleware } from './middleware/user-logging/user-logging.middleware';
import { AuthGuard } from './guards/auth/auth.guard';
import { RolesGuard } from './guards/roles/roles.guard';

@Module({
  imports: [ProductsModule],
  controllers: [
    AppController,
    ProductsController,
    AuthController,
    ClientsController,
  ],
  providers: [AppService, ProductsService, UserService, AuthGuard, RolesGuard],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // .apply(LoggingMiddleware, TokenMiddleware, convertMidlleware)
      // .forRoutes('*')
      // .apply(ContentTypeMiddleware)
      // .forRoutes({ path: 'clients/*', method: RequestMethod.GET })
      .apply(UserLoggingMiddleware)
      .forRoutes('*');
  }
}
