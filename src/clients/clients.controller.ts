import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('clients')
export class ClientsController {
  @Get('route1')
  route1() {
    return 'Route 1';
  }

  @Get('route2')
  route2() {
    return 'Route 2';
  }

  @Get('route3')
  route3() {
    return 'Route 3';
  }

  @Post('route4')
  route4(@Req() req: Request) {
    return {
      contentType: req.headers['content-type'],
      message: 'Route 4 under clients/',
    };
  }
}
