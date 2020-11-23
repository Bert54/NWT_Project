import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { GamesDao } from './dao/games.dao';
import { Game } from './interfaces/game.interface';
import { GameEntity } from './entities/game.entity.js';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { GameDto } from './dto/game.dto';
import { GameOwnerDto } from './dto/game-owner.dto';

@Injectable()
export class VideogamesService {

  constructor(private readonly _gamesDao: GamesDao) {

  }

  findAll(username: string): Observable<GameEntity[] | void> {
    return this._gamesDao.findAll(username)
      .pipe(
        map(_ => !!_ ? _.map(__ => new GameEntity(__)) : undefined),
      );
  }

  findOne(username: string, id: string): Observable<GameEntity> {
    return this._gamesDao.findById(username, id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ? of(new GameEntity(_)) :
          throwError(new NotFoundException(`Game with id '${id}' not found`)),
      ),
    );
  }

  create(username: string, game: GameDto): Observable<GameEntity> {
    return of(this._addUserNameToGame(username, game))
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

  delete(username: string, id: string): Observable<void> {
    return this._gamesDao.findByIdAndRemove(username, id)
      .pipe(
        catchError(e => throwError(new NotFoundException(e.message))),
        mergeMap(_ =>
          !!_ ?
            of(undefined) :
            throwError(new NotFoundException(`Game with id '${id}' not found`)),
        ),
      );
  }

  update(id: string, game: GameDto): Observable<GameEntity> {
    return this._gamesDao.findByIdAndUpdate(id, game)
      .pipe(
        catchError(e =>
          e.code === 11000 ?
            throwError(
              new ConflictException(`Game '${game.name}' on '${game.platform}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        mergeMap(_ =>
          !!_ ?
            of(new GameEntity(_)) :
            throwError(new NotFoundException(`Game with id '${id}' not found`)),
        ),
      );
  }

  private _addUserNameToGame(username: string, game: GameDto): GameOwnerDto {
    return {
      name: game.name,
      cover: game.cover,
      genre: game.genre,
      platform: game.platform,
      description: game.description,
      username: username
    }
  }

}
