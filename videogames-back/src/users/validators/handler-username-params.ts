import { IsNotEmpty, IsString } from 'class-validator';

export class HandlerIdParam {

  @IsString()
  @IsNotEmpty()
  username: string;

}
