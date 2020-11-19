import { Injectable } from '@nestjs/common';
import { Model, MongooseDocument } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from '../interfaces/game.interface';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GamesDao {

  constructor(@InjectModel('Games') private readonly _gameModel: Model<Game>) {}

  findAll(): Observable<Game[] | void> {
    return from(this._gameModel.find({}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }

}
