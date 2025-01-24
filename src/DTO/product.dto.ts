import { IsNotEmpty, IsString, Min } from 'class-validator';

export class ProductDTO {
  @IsString()
  productname: string;

  price: number;
  image: string;
}
