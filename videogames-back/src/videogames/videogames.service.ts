import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { GamesDao } from './dao/games.dao';
import { Game } from './interfaces/game.interface';
import { GameEntity } from './entities/game.entity.js';
import { map } from 'rxjs/operators';

@Injectable()
export class VideogamesService {

  constructor(private readonly _gamesDao: GamesDao) {

  }

  findAll(): Observable<GameEntity[] | void> {
    return this._gamesDao.findAll()
      .pipe(
        map(_ => !!_ ? _.map(__ => new GameEntity(__)) : undefined),
      );
  }
}
