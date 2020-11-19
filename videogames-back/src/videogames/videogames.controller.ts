import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { VideogamesService } from './videogames.service';
import { Observable } from 'rxjs';
import { GameEntity } from './entities/game.entity.js';

@Controller('games')
@UseInterceptors(ClassSerializerInterceptor)
export class VideogamesController {

  constructor(private readonly _gameservice: VideogamesService) {}

  @Get()
  findAll(): Observable<GameEntity[] | void> {
    return this._gameservice.findAll();
  }

}
