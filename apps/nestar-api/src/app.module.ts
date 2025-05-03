import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver} from "@nestjs/apollo";
import { AppResolver } from './app.resolver';
import { ComponentsModule } from './components/components.module';
import { DatabaseModule } from './database/database.module';
import { error } from 'console';
import { T } from './libs/types/common';
import { SocketModule } from './socket/socket.module';

@Module({    // Module decorator orqali boyitilmoqda (ozi bilan MetaData lani olib keladi)
  imports: [  // Natijada Module Ingridientga aylandi va markaziy bo'gichga aylandi (Demak Module orqali quriladi)
    ConfigModule.forRoot(),    // Environmental Variable
    GraphQLModule.forRoot({  
      driver: ApolloDriver,           // GraphQL Engine
      playground: true,
      uploads: false,
      autoSchemaFile: true,    // Backend nima info berishini frontendga korsatishi!
      formatError: (error: T) => {        //  T => TypeScriptda object type yuk!
        const graphQLFormattedError = {
          code: error?.extensions.code,  // ich ichiga kirishidan Object typeligini koryapmiz!
          message: 
            error?.extensions?.exception?.response?.message || error?.extensions?.response?.message || error?.message,
        };
        console.log('GRAPHQL GLOBAL ERR:', graphQLFormattedError);
        return graphQLFormattedError;     // res
      }, 
    }), // GraphQL API:
    ComponentsModule,
    DatabaseModule,
    SocketModule, 
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
// formatError => vazifasi Errorlarni togri formatlash!

/** 
MESSAGE TARGET :

  1) Client => only client
  2) Broadcast => except client
  3) Emit => all clients

 **/