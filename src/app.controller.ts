import { Controller, Get, Render } from '@nestjs/common';
import { ProductService } from './products/service/product/product.service';

@Controller('mystore')
export class AppController {
  constructor(private readonly productService: ProductService) {}

  @Get('home')
  @Render('home')
  async renderPage() {
    const products = await this.productService.getAll();
    console.log(products);
    return { products };
  }

  @Get('add-product')
  @Render('add-product')
  renderAddProductPage() {
    return null;
  }
}
