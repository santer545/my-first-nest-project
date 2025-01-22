import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Req,
  SetMetadata,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { UserDTO } from './UserDTO/user.dto';
import { UserService } from './services/user/user.service';
import { AuthGuard } from './guards/auth/auth.guard';
import { RolesGuard } from './guards/roles/roles.guard';
import { Roles } from './customDecorators/roles.decorator';
import { Role } from './enums/role.enum';
import { TestInterceptor } from './interceptors/test/test.interceptor';
import { ResponseTransformInterceptor } from './interceptors/response-transform/response-transform.interceptor';
import { UserDataTransformInterceptor } from './interceptors/user-data-transform/user-data-transform.interceptor';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';

// @UseGuards(AuthGuard)
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

  @Post('create')
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  @UseInterceptors(UserDataTransformInterceptor)
  createUser(@Body() userData: any) {
    this.userService.createUser(userData);
    return 'User created';
  }

  @Get('user')
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  getUser(@Req() req: any) {
    const apiKey = req.user.apiKey;
    const user = this.userService.getUser(apiKey);

    if (!user) {
      return;
    }

    const { name, email } = user;
    return {
      name,
      email,
    };
  }

  @Get('all')
  @UseInterceptors(ResponseTransformInterceptor)
  getAll() {
    return { message: 'Response transform Interceptor executed' };
  }

  @Get(':id')
  @UseInterceptors(AuthInterceptor, UserDataTransformInterceptor)
  getData(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.findUser(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
