import { Schema, model } from 'mongoose';

const schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    lowercase: true,
  },
  cheats: [{ type: Schema.Types.ObjectId, ref: 'cheat' }],
});

export default model('category', schema);
