import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from './entities/user.entity.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HandlerIdParam } from './validators/handler-username-params';

@Controller('users')
export class UsersController {

  constructor(private _usersService: UsersService, private _authService: AuthService) {
  }

  @Post()
  async create(@Body() user: UserDto): Promise<UserEntity> {
    return this._authService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user.username;
  }

}
