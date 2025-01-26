import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

global.isLoggedIn = 'init';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req, res: Response, next: NextFunction) {
    const token = req.session.token;
    const publicPaths = ['/user/login', '/user/sign-up', '/user/logout'];

    if (publicPaths.includes(req.path)) {
      return next();
    }

    if (token) {
      try {
        const decodedToken = this.jwtService.verify(token);
        req.user = decodedToken;
        global.isLoggedIn = 'true';
        next();
      } catch (error) {
        global.isLoggedIn = 'false';
        return res.redirect('/user/login');
      }
    } else {
      global.isLoggedIn = 'false';
      return res.redirect('/user/login');
    }
  }
}
