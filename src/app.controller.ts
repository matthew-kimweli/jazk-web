import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('health')
  getHealth(@Req() req): any {
    var ck = 'debunkbot12@!!';
    let name = 'debunkbot'
    const originHost = req.headers.host;

    const allowedHostname = 'sales.jubileeallianz.co.ug';

    if (originHost === allowedHostname) {
      return {
        ck: ck,
        nm: name,
        h: originHost
      };
    } else {
      return {
        h: originHost
      }
    }

  }
}
