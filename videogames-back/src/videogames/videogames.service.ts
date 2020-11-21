import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { GamesDao } from './dao/games.dao';
import { Game } from './interfaces/game.interface';
import { GameEntity } from './entities/game.entity.js';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CreateGameDto } from './dto/create-game.dto';

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

  findOne(id: string): Observable<GameEntity> {
    return this._gamesDao.findById(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ? of(new GameEntity(_)) :
          throwError(new NotFoundException(`Game with id '${id}' not found`)),
      ),
    );
  }

  create(game: CreateGameDto): Observable<GameEntity> {
    return of(game)
      .pipe(
        mergeMap(_ => this._gamesDao.save(_)),
        catchError(e =>
          e.code === 11000 ?
            throwError(
              new ConflictException(`Game '${game.name}' on '${game.platform}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        map(_ => new GameEntity(_)),
      );
  }

}
