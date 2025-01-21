import { Transform, Type } from 'class-transformer';
import {
  IsAlphanumeric,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum Country {
  Nigeria = 'Nigeria',
  Ghana = 'Ghana',
  Kenya = 'Kenya',
  SouthAfrica = 'South Africa',
}

export class AuthDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password is too short. It must be at least 8 characters long.',
  })
  password: string;

  @IsOptional()
  @IsEnum(Country)
  country: Country;

  @IsDate()
  @Type(() => Date)
  dob: Date;

  @IsOptional()
  @IsNumber()
  phone: number;
}
