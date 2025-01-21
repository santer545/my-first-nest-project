import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  addProduct(title: string, desc: string, price: number) {
    const prodId = new Date().getTime().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getProduct(productId: string) {
    const [product] = this.findProduct(productId);

    if (!product) {
      throw new NotFoundException('Could not find product.');
    }

    return { ...product };
  }

  updateProduct(
    id: string,
    productData: {
      title?: string | null;
      description?: string | null;
      price?: number | null;
    },
  ) {
    const [product, index] = this.findProduct(id);

    const updatedProduct = {
      title: productData.title ? productData.title : null,
      description: productData.description ? productData.description : null,
      price: productData.price ? productData.price : null,
    };

    this.products[index] = { ...product, ...updatedProduct } as Product;

    return this.products[index];
  }

  partialUpdateProduct(
    id: string,
    productData: {
      title?: string | null;
      description?: string | null;
      price?: number | null;
    },
  ) {
    const [product, index] = this.findProduct(id);

    this.products[index] = { ...product, ...productData } as Product;

    return this.products[index];
  }

  removeProduct(productId: string) {
    const [_, index] = this.findProduct(productId);
    this.products.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return [product, productIndex];
  }
}
