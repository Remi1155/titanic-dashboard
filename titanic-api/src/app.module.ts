// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TitanicModule } from './titanic/titanic.module'; // Sera créé à l'étape suivante

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rend le ConfigModule disponible globalement
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DB_TYPE') as 'mysql', // Assertion de type
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT', '3306'), 10), // Fournit une valeur par défaut
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Chemin vers vos entités
        synchronize: false, // IMPORTANT: false en production, true peut l'être en dev pour créer les tables
        autoLoadEntities: true, // Recommandé pour charger automatiquement les entités
      }),
    }),
    TitanicModule, // Importe le module que nous allons créer
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { TitanicModule } from './titanic/titanic.module';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
