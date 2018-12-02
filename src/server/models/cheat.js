import { Schema, model } from 'mongoose';

const schema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  command: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
});

export default model('cheat', schema);
