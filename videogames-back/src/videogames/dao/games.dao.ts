import { Injectable } from '@nestjs/common';
import { Model, MongooseDocument } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from '../interfaces/game.interface';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameDto } from '../dto/game.dto';
import { GameOwnerDto } from '../dto/game-owner.dto';

@Injectable()
export class GamesDao {

  constructor(@InjectModel('Games') private readonly _gameModel: Model<Game>) {}

  findAll(username: string): Observable<Game[] | void> {
    return from(this._gameModel.find({ username: username }))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }

  findById(username: string, id: string): Observable<Game | void> {
    return from(this._gameModel.findOne({ _id: id, username: username }))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  save(game: GameOwnerDto): Observable<Game> {
    return from(new this._gameModel(game).save())
      .pipe(
        map((doc: MongooseDocument) => doc.toJSON()),
      );
  }

  findByIdAndRemove(username: string, id: string): Observable<Game | void> {
    return from(this._gameModel.findOneAndRemove({ _id: id, username: username }))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  findByIdAndUpdate(id: string, person: GameDto): Observable<Game | void> {
    return from(this._gameModel.findByIdAndUpdate(id, person, { new: true, runValidators: true }))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

}
