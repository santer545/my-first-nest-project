import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ContentTypeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const contentType = req.headers['content-type'];

    if (!contentType || contentType !== 'application/json') {
      return res
        .status(400)
        .json({ message: 'Content-Type must be application/json' });
    }

    next();
  }
}
