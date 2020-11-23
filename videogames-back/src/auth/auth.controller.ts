import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserDto } from '../users/dto/user.dto';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs';

@Controller()
export class AuthController {

  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Body() user: UserDto): Observable<any> {
    return fromPromise(this.authService.login(user.username));
  }

}
