import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GameOwnerDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  cover: string;

  @IsString()
  @IsIn(["Action", "FPS", "Platform", "Beat em up", "Battle royale", "Action-adventure", "RPG", "JRPG", "MMORPG", "Roguelike", "Adventure", "Visual novel", "Simulation", "Strategy", "Fighting", "Sports", "Other"])
  @IsNotEmpty()
  genre: string;

  @IsString()
  @IsIn(["PC", "Android", "IOS", "Xbox Series X", "Xbox Series S", "Xbox One", "Xbox 360", "Xbox", "PS5", "PS4", "PS3", "PS2", "PS1", "PS Vita", "PSP", "Switch", "Wii U", "Wii", "Game Cube", "N64", "SNES", "NES", "3DS", "DS", "GBA", "Game Boy", "Other"])
  @IsNotEmpty()
  platform: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  username: string

}
