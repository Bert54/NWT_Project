import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class GameEntity {

  @Expose()
  @Type(() => String)
  id: string;

  @Expose()
  @Type(() => String)
  name: string;

  @Expose()
  @Type(() => String)
  cover: string;

  @Expose()
  @Type(() => String)
  genre: string;

  @Expose()
  @Type(() => String)
  platform: string;

  @Expose()
  @Type(() => String)
  description: string;


  constructor(partial: Partial<GameEntity>) {
    Object.assign(this, partial);
  }
}
