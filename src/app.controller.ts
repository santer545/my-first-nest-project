import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  fetchRequest(@Req() req: Request, @Res() res) {
    const { id } = req.params;
    const queryParam = req.query;
    const userAgent = req.headers['user-agent'];

    return res.send(`<script>
      console.log('id: ${id}');
      console.log('queryParam: ${JSON.stringify(queryParam)}');
      console.log('userAgent: ${userAgent}');</script>`);
  }
}
