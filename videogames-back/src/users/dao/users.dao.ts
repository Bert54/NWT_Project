import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Model, MongooseDocument } from 'mongoose';
import { UserDto } from '../dto/user.dto';
import { User } from '../interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { fromPromise } from 'rxjs/internal-compatibility';

@Injectable()
export class UsersDao {

  constructor(@InjectModel('Users') private readonly _userModel: Model<User>) {
  }

  findOneByUsername(username: string): Observable<User | void> {
    return fromPromise(this._userModel.findOne({ username: username })).pipe(
      map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
    );
  }

  save(user: UserDto): Observable<User> {
    return fromPromise(new this._userModel(user).save())
      .pipe(
        map((doc: MongooseDocument) => doc.toJSON()),
      );
  }

}
