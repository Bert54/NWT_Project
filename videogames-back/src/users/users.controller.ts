import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from './entities/user.entity.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Observable, of } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';

@Controller('users')
export class UsersController {

  constructor(private _usersService: UsersService, private _authService: AuthService) {
  }

  @Post()
  create(@Body() user: UserDto): Observable<UserEntity> {
    return fromPromise(this._authService.register(user));
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): Observable<any> {
    return of({'username': req.user.username});
  }

}
