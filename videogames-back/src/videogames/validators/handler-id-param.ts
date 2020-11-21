import { IsMongoId, IsNotEmpty } from 'class-validator';

export class HandlerIdParam {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
