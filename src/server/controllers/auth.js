import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User } from '../models';
import config from '../config';


export default new class {
  signUp = async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      const token = jwt.sign(user.id, config.JWT_SECRET);
      return res.status(201).send({
        message: 'Sign-up successful',
        data: { token },
      });
    } catch (error) {
      return res.status(400).send({
        error: error.message,
      });
    }
  }

  signIn = async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        throw new Error('Invalid sign in credentials');
      }
      return res.status(200).send({
        message: 'Sign-in successful',
        data: {
          token: jwt.sign(user.id, config.JWT_SECRET),
        },
      });
    } catch (error) {
      return res.status(400).send({
        error: error.message,
      });
    }
  }
}();
