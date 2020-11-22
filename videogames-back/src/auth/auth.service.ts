import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { UserDto } from '../users/dto/user.dto';
import { UserEntity } from '../users/entities/user.entity.js';

@Injectable()
export class AuthService {

  private _payload: any;

  constructor(
    private _usersService: UsersService,
    private _jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this._usersService.findOneByUsername(username);
    if (user) {
      const isPasswordMatching = await bcrypt.compare(pass, user.password);
      if (isPasswordMatching) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    return this._usersService.findOneByUsername(user).then( response => {
      const payload = { username: user, sub: response.id };
      return this._payload =  {
        access_token: this._jwtService.sign(payload),
      };
    })
  }

  public async register(user: UserDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const createdUser = await this._usersService.create({
      ...user,
      password: hashedPassword
    });
    createdUser.password = undefined;
    return createdUser;
  }

}
