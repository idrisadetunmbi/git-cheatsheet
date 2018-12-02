import mongoose from 'mongoose';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import bcrypt from 'bcrypt';


const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, 'specified username already exists'],
    required: true,
    lowercase: true,
    trim: true,
    minlength: 5,
    maxlength: 15,
    validate: {
      validator: value => isAlphanumeric(value),
      msg: () => 'username can only contain alphanumeric characters',
    },
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  cheats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cheat' }],
});

schema.post('validate', function (doc, next) { // eslint-disable-line
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

export default mongoose.model('user', schema);
