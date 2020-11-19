import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FetchOneHandlerParams {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
