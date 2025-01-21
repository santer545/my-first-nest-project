import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthDto } from './authDto';
import { PhoneAuth } from './customPipe/phoneAuth';

@Controller('auth')
export class AuthController {
  @Post('register')
  @UsePipes(PhoneAuth)
  registerUser(@Body() userData: AuthDto) {
    return {
      email: userData.email,
      password: userData.password,
      country: userData.country,
      dob: userData.dob,
    };
  }
}
