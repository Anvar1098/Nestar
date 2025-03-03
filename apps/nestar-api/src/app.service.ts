import { Injectable } from '@nestjs/common';

@Injectable()   // Service model Injectable  decorator orqali boyitib qurilmoqda
export class AppService {
  getHello(): string {
    return 'Welcome to Nestar Rest API Server!';
  }
}
