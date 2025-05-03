import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {  ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './libs/interceptor/Logging.interceptor';
import { graphqlUploadExpress} from "graphql-upload";
import * as express from 'express';
import { WsAdapter } from '@nestjs/platform-ws';


// Global Integrations will be called here
async function bootstrap() {
  const app = await NestFactory.create(AppModule);     // App =>    Express + NestJs
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors({ origin: true, credentials: true });

  app.use(graphqlUploadExpress({ MaxFileSize: 15000000, maxFiles: 10}));
  app.use('/uploads', express.static('uploads'));
  
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(process.env.PORT_API ?? 3000);
}
bootstrap();


// AppModule => Loyihani markaziy bo'gichi (yani hammasini oz ichiga oladi)
// Har bir Modulni oz MVC si borligi uchun app.controller va app.moduldan foydalanmiymiz!
// app.controllerda masalan standard mantiqla yozamiz => server is running and etc..
// Modelar ni farqi serverlar soni bilan olchanadi!
// Standard Mode => Yagona serverli loyiha
// Monorepo Mode => Kop repository lik boladi (Yagona GitHub) => multi server
// Batch server => masalan kunni malum bir qismida malum vazifani bajarib chikib ketadi (bunga tashqaridan request kelmaydi)
// Batch server => aytilgan paytda ishga tushib , vazifasini yakunlaydi
// NestJs => server side application framework va ingridientlari orqali tashkilashtirdi, AOP asosi bu => module!
// GraphQl API da endpoint bolmaydi va mutation va query orqali method nomi bilan boglanadi!
// Demak GraphQL da automatic error handling borligi sababli try catch bolmaydi!  (App.module ichida formatError bor)!
// MVC ni (API) ishga tushirishdan oldin  modullarga wrap qildik, shuni uchun modular tizim tez ishlayid => AOP muhim konsepsiyasi!

// WebSocket bu Rest yoki GraphQL API ga oxshab HTTP protokol ustiga emas balki TCP ustiga quriladi
// Lekin 1 chi HTTP orqali ulanganda serverga leyin TCP ga kuchadi! Shu sababli doimiy aloqa urnatiladi!





// class + interface => implements
// class + class => extends
// interface + interface => extends 