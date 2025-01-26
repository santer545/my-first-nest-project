import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query,
  Redirect,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { UserDTO } from 'src/DTO/user.dto';
import { UserService } from 'src/users/service/user/user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('login')
  @Render('login')
  renderLogin(
    @Req() req,
    @Query('message') message: string,
    @Query('username') username: string,
  ) {
    return { isLoggedIn: global.isLoggedIn, username, message };
  }

  @Get('logout')
  @Redirect('/mystore/home')
  userLogout(@Res() res: Response, @Req() req) {
    req.session.destroy((err) => {
      if (err) {
        throw new InternalServerErrorException('Failed to destroy session');
      }
    });
    res.clearCookie('connect.sid');
  }

  @Post('sign-up')
  @Redirect('/mystore/home')
  async signUp(@Body() newUser: UserDTO, @Res() res: Response) {
    try {
      const existingUser = await this.userService.findUserByUsername(
        newUser.username,
      );

      if (existingUser) {
        return res.redirect(
          '/mystore/sign-up?message=User is already registered. Please choose a new username',
        );
      }
      await this.userService.createUser(newUser);
      return res.redirect(
        '/user/login?message=Sign up successful. Please log in.',
      );
    } catch (err) {
      console.error('Error during sign-up', err);
      return res.redirect(
        '/mystore/sign-up?message=Sign up failed. Please try again',
      );
    }
  }

  @Post('login')
  async userLogin(@Body() body: UserDTO, @Res() res: Response, @Req() req) {
    const { username, password } = body;

    const user = await this.userService.findUserByUsername(username);

    if (user) {
      const isMatch = await this.userService.comparePasswords(
        password,
        user.password,
      );

      if (isMatch) {
        const token = this.jwtService.sign({ username });
        req.session.token = token;

        req.session.save((err) => {
          console.error(err);
        });
        return res.redirect('/mystore/home');
      } else {
        req.session.destroy(() => {
          return res.redirect(
            `/user/login?message=Invalid password. Please try again.&username=${username}`,
          );
        });
      }
    } else {
      req.session.destroy(() => {
        return res.redirect(
          `/user/login?message=Not a registered user. Please sign up.&username=${username}`,
        );
      });
    }
  }
}
