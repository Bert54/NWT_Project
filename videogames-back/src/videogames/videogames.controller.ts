import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { VideogamesService } from './videogames.service';
import { Observable } from 'rxjs';
import { GameEntity } from './entities/game.entity.js';
import { FetchOneHandlerParams } from './validators/fetchone-handler-params';
import { CreateGameDto } from './dto/create-game.dto';

@Controller('games')
@UseInterceptors(ClassSerializerInterceptor)
export class VideogamesController {

  constructor(private readonly _gameservice: VideogamesService) {}

  @Get()
  findAll(): Observable<GameEntity[] | void> {
    return this._gameservice.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FetchOneHandlerParams): Observable<GameEntity | void> {
    return this._gameservice.findOne(params.id);
  }

  @Post()
  create(@Body() game: CreateGameDto): Observable<GameEntity> {
    return this._gameservice.create(game);
  }

}
