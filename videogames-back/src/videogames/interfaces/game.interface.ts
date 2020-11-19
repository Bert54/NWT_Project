import { Document } from 'mongoose';

export interface Game extends Document {
  id: string;
  name: string;
  cover: string;
  genre: string;
  platform: string;
  description: string;
}
