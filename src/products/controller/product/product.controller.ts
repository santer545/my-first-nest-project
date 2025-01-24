import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Redirect,
  Render,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ProductDTO } from 'src/DTO/product.dto';
import { Product } from 'src/entities/product';
import { ProductService } from 'src/products/service/product/product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('getOne/:id')
  @Render('edit-product')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productService.getOne(id);
    return { product };
  }

  @Post('create')
  @Redirect('/mystore/home')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async addProduct(
    @Body() productData: ProductDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      productData.image = file.filename;
    }
    return await this.productService.addProduct(productData);
  }

  @Put('update/:id')
  @Redirect('/mystore/home')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: ProductDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      updateData.image = file.filename;
    }
    return await this.productService.updateProduct(id, updateData);
  }

  @Delete('delete/:id')
  @Redirect('/mystore/home')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    await this.productService.deleteProduct(id);
    return 'Product deleted successfully';
  }
}
