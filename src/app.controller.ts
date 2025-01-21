import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';

@Controller()
export class AppController {
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  fetchRequest(@Param('id', ParseIntPipe) id: number) {
    return `Fetched ID: ${id}`;
  }

  @Get('pipe/:id')
  getId(@Param('id', ParseUUIDPipe) id: number) {
    return `ID: ${id}`;
  }
}
