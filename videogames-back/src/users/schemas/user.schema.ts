import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  }
},  {
  toJSON: { virtuals: true },
  versionKey: false,
  collection: 'Users',
  autoCreate: true
});
