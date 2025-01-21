import {
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UserDTO {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(50, { message: 'Name is too long' })
  readonly name: string;

  @IsAlphanumeric()
  @IsNotEmpty({ message: 'Password is required' })
  @MaxLength(8, { message: 'Password is too long' })
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly createdAt?: string;
}
