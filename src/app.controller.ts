import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('health')
  getHealth(@Req() req): any {
    const originHost = req.headers.host;

    return 'health'

  }
}
