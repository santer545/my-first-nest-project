import { Controller, Get, Query, Render, Req } from '@nestjs/common';
import { ProductService } from './products/service/product/product.service';
import { Request } from 'express';

@Controller('mystore')
export class AppController {
  constructor(private readonly productService: ProductService) {}

  @Get('home')
  @Render('home')
  async renderPage(@Req() req: Request) {
    const products = await this.productService.getAll();
    return { products, isLoggedIn: global.isLoggedIn };
  }

  @Get('add-product')
  @Render('add-product')
  renderAddProductPage(@Req() req: Request) {
    return { isLoggedIn: global.isLoggedIn };
  }

  @Get('sign-up')
  @Render('sign-up')
  renderSignUpPage(@Req() req: Request, @Query('message') message: string) {
    return { isLoggedIn: global.isLoggedIn, message };
  }
}
