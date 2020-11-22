import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class UserEntity {

  @Expose()
  @Type(() => String)
  id: string;

  @Expose()
  @Type(() => String)
  username: string;

  password: string;


  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

}
