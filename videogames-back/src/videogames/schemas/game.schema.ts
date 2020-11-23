import * as mongoose from 'mongoose';

export const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  cover: {
    type: String,
    required: false,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  platform: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  }
},  {
  toJSON: { virtuals: true },
  versionKey: false,
  collection: 'Games',
  autoCreate: true
});
