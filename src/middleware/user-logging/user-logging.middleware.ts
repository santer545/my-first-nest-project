import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/services/user/user.service';
import { UserDTO } from 'src/UserDTO/user.dto';

const bcrypt = require('bcrypt');

@Injectable()
export class UserLoggingMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.body && req.body.name) {
      req.body.name = req.body.name.toUpperCase();
    }

    if (req.body && req.body.name && req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const createdUserDTO: UserDTO = {
        name: req.body.name,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      };

      this.userService.createUser(createdUserDTO);
    }
    next();
  }
}
