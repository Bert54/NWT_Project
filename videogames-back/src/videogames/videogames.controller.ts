import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post, Put, Request, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { VideogamesService } from './videogames.service';
import { Observable } from 'rxjs';
import { GameEntity } from './entities/game.entity.js';
import { HandlerIdParam } from './validators/handler-id-param';
import { GameDto } from './dto/game.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('games')
@UseInterceptors(ClassSerializerInterceptor)
export class VideogamesController {

  constructor(private readonly _gameservice: VideogamesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req): Observable<GameEntity[] | void> {
    return this._gameservice.findAll(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Request() req, @Param() params: HandlerIdParam): Observable<GameEntity | void> {
    return this._gameservice.findOne(req.user.username, params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() game: GameDto): Observable<GameEntity> {
    return this._gameservice.create(req.user.username, game);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Request() req, @Param() params: HandlerIdParam): Observable<void> {
    return this._gameservice.delete(req.user.username, params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Request() req, @Param() params: HandlerIdParam, @Body() game: GameDto): Observable<GameEntity> {
    return this._gameservice.update(params.id, game);
  }

}
