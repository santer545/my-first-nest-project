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
  SetMetadata,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { UserDTO } from './UserDTO/user.dto';
import { UserService } from './services/user/user.service';
import { AuthGuard } from './guards/auth/auth.guard';
import { RolesGuard } from './guards/roles/roles.guard';
import { Roles } from './customDecorators/roles.decorator';
import { Role } from './enums/role.enum';

@UseGuards(AuthGuard)
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
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
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
}
