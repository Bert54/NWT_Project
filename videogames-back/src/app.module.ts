import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { VideogamesModule } from './videogames/videogames.module';
import * as Config from 'config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

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
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
