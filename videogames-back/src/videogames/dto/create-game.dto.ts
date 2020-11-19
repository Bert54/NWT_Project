import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGameDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  cover: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsString()
  @IsNotEmpty()
  platform: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description: string;

}
