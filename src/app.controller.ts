import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Req,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { UserDTO } from './UserDTO/user.dto';
import { UserService } from './services/user/user.service';

@Controller()
export class AppController {
  constructor(private userService: UserService) {}
  @Get('pipe/:id')
  getId(@Param('id', ParseUUIDPipe) id: number) {
    return `ID: ${id}`;
  }

  @Post()
  createMsg(@Body() msg: string) {
    console.log(msg);
    return 'Message created';
  }

  @Get('token')
  getToken(@Req() req: Request) {
    const token = req['token'];
    return { message: 'Token received', token };
  }

  @Get('users')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('users')
  createUser(@Body() user: UserDTO) {
    return this.userService.getAllUsers();
  }
}
