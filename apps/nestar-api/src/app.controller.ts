import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()         //  Controller decorator orqali boyitib qurilmoqda
export class AppController {   // Ham routing ham controller boladi AppController
  constructor(private readonly appService: AppService) {}  // Dependency Injection => classdan automatic instance oladi

  @Get()  //  @Get('/') by default boladi slash
  getHello(): string {
    return this.appService.getHello();
  }
}
