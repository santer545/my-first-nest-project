import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductController } from './controller/product/product.controller';
import { ProductModule } from './module/product/product.module';
import { ProductService } from './service/product/product.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [],
})
export class ProductsModule {}
