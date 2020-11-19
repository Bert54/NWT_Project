import { Logger, Module } from '@nestjs/common';
import { VideogamesService } from './videogames.service';
import { GamesDao } from './dao/games.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { GameSchema } from './schemas/game.schema';
import { VideogamesController } from './videogames.controller';

@Module({
  imports: [ MongooseModule.forFeature([ { name: 'Games', schema: GameSchema } ]) ],
  controllers: [ VideogamesController ],
  providers: [ VideogamesService, Logger, GamesDao ],
})
export class VideogamesModule {}
