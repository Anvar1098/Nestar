import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver} from "@nestjs/apollo";
import { AppResolver } from './app.resolver';
import { ComponentsModule } from './components/components.module';
import { DatabaseModule } from './database/database.module';

@Module({    // Module decorator orqali boyitilmoqda (ozi bilan MetaData lani olib keladi)
  imports: [  // Natijada Module Ingridientga aylandi va markaziy bo'gichga aylandi (Demak Module orqali quriladi)
    ConfigModule.forRoot(),    // Environmental Variable
    GraphQLModule.forRoot({  
      driver: ApolloDriver,
      playground: true,
      uploads: false,
      autoSchemaFile: true,    // Backend nima info berishini frontendga korsatishi!
    }), 
    ComponentsModule,
    DatabaseModule, 
  ],
  controllers: [AppController],                   // Ingridient  (Reat API ga ishliydi)
  providers: [AppService, AppResolver],           // Ingridient
})
export class AppModule {}

// Aslida bizga korinmagan state va methodlar hosil bulmoqda ApModule class ichida
// MetaData => yashirin sourceni olib yuklash
// Dependency Injection => Tezlikni oshiradi
// NESTJs => AOP ustiga qurilgan
// ConfigModule => External package (biz uchun tayyor package)
// GraphQLModule =>  External package (biz uchun tayyor package)
// ConfigModule.forRoot() => ildiz otishi
// Rest Api & GraphQL API => HTTP ustiga qurilgan
// GraphQL API => bir request orqali hamma kerakli infoni yigib kelish mumkin backenddan!