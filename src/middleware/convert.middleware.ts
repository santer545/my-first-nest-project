import { NextFunction, Request, Response } from 'express';

export function convertMidlleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.body && typeof req.body === 'object') {
    res.status(200).json(req.body);
  }
  next();
}
