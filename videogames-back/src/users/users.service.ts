import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { UsersDao } from './dao/users.dao';
import { of, throwError } from 'rxjs';
import { UserEntity } from './entities/user.entity.js';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {

  constructor(private readonly _usersDao: UsersDao) {
  }

  create(user: UserDto): Promise<UserEntity> {
    return of(user)
      .pipe(
        mergeMap(_ => this._usersDao.save(_)),
        catchError(e =>
          e.code === 11000 ?
            throwError(
              new ConflictException(`User '${user.username}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        map(_ => new UserEntity(_)),
      ).toPromise();
  }

  findOneByUsername(username: string): Promise<UserEntity> {
    return this._usersDao.findOneByUsername(username)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ? of(new UserEntity(_)) :
            throwError(new NotFoundException(`User '${username}' not found`)),
        ),
      ).toPromise();
  }

}
