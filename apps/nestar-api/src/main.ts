import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);     // App =>    Express + NestJs
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT_API ?? 3000);
}
bootstrap();


// AppModule => Loyihani markaziy bo'gichi (yani hammasini oz ichiga oladi)
// Har bir Modulni oz MVC si borligi uchun app.controller va app.moduldan foydalanmiymiz!
// app.controllerda masalan standard mantiqla yozamiz => server is running and etc..
// Modelar ni farqi serverlar soni bilan olchanadi!
// Standard Mode => 
// Monorepo Mode => Kop repository lik boladi (Yagona GitHub)
// Batch server => masalan kunni malum bir qismida malum vazifani bajarib chikib ketadi (bunga tashqaridan request kelmaydi)
// Batch server => aytilgan paytda ishga tushib , vazifasini yakunlaydi