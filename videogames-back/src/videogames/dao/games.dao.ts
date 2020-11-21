import { Injectable } from '@nestjs/common';
import { Model, MongooseDocument } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from '../interfaces/game.interface';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateGameDto } from '../dto/create-game.dto';

@Injectable()
export class GamesDao {

  constructor(@InjectModel('Games') private readonly _gameModel: Model<Game>) {}

  findAll(): Observable<Game[] | void> {
    return from(this._gameModel.find({}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }

  findById(id: string): Observable<Game | void> {
    return from(this._gameModel.findById(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  save(game: CreateGameDto): Observable<Game> {
    return from(new this._gameModel(game).save())
      .pipe(
        map((doc: MongooseDocument) => doc.toJSON()),
      );
  }

}
