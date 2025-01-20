import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.model';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getProducts(): Product[] {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') id: string): Product {
    return this.productsService.getProduct(id);
  }

  @Post()
  createProduct(
    @Body('title') pTitle: string,
    @Body('description') pDescription: string,
    @Body('price') pPrice: number,
  ) {
    return {
      id: this.productsService.addProduct(pTitle, pDescription, pPrice),
    };
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() productData: Product) {
    return this.productsService.updateProduct(id, productData);
  }

  @Patch(':id')
  partialUpdateProduct(@Param('id') id: string, @Body() productData: Product) {
    return this.productsService.partialUpdateProduct(id, productData);
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    this.productsService.removeProduct(id);
    return { message: 'Product deleted successfully.' };
  }
}
