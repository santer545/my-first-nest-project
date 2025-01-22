import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductDTO } from 'src/DTO/product.dto';
import { ProductService } from 'src/products/service/product/product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('create')
  async addProduct(@Body() productData: ProductDTO) {
    await this.productService.addProduct(productData);
    return 'Product added successfully';
  }

  @Get('getAll')
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get('getProduct/:id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.getProductById(id);
  }

  @Put('update/:id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() productData: ProductDTO,
  ) {
    return await this.productService.updateProduct(id, productData);
  }

  @Delete('delete/:id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    await this.productService.deleteProduct(id);
    return 'Product deleted successfully';
  }
}
