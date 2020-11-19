import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { VideogamesController } from './videogames/videogames.controller';
import { VideogamesModule } from './videogames/videogames.module';
import * as Config from 'config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(Config.get<string>('mongodb.uri'), Config.get<MongooseModuleOptions>('mongodb.options')),
    VideogamesModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI', Config.get('mongodb.uri')),
        useNewUrlParser: Config.get<MongooseModuleOptions>('mongodb.options.useNewUrlParser'),
        useUnifiedTopology: Config.get<MongooseModuleOptions>('mongodb.options.useUnifiedTopology'),
        useFindAndModify: Config.get<MongooseModuleOptions>('mongodb.options.useFindAndModify'),
      })
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
