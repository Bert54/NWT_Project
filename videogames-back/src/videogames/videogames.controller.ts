import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post, Put,
  UseInterceptors,
} from '@nestjs/common';
import { VideogamesService } from './videogames.service';
import { Observable } from 'rxjs';
import { GameEntity } from './entities/game.entity.js';
import { HandlerIdParam } from './validators/handler-id-param';
import { GameDto } from './dto/game.dto';

@Controller('games')
@UseInterceptors(ClassSerializerInterceptor)
export class VideogamesController {

  constructor(private readonly _gameservice: VideogamesService) {}

  @Get()
  findAll(): Observable<GameEntity[] | void> {
    return this._gameservice.findAll();
  }

  @Get(':id')
  findOne(@Param() params: HandlerIdParam): Observable<GameEntity | void> {
    return this._gameservice.findOne(params.id);
  }

  @Post()
  create(@Body() game: GameDto): Observable<GameEntity> {
    return this._gameservice.create(game);
  }

  @Delete(':id')
  delete(@Param() params: HandlerIdParam): Observable<void> {
    return this._gameservice.delete(params.id);
  }

  @Put(':id')
  update(@Param() params: HandlerIdParam, @Body() game: GameDto): Observable<GameEntity> {
    return this._gameservice.update(params.id, game);
  }

}
