import UserModel from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class User {
  static signup (req, res, next) {
    let userData = {
      username: req.body.username.trim(),
      email: req.body.email.trim(),
      password: req.body.password
    };

    UserModel.create(userData, (err, user) => {
      if (err) {
        console.dir(err);
        return next(err);
      }
      
      const token = jwt.sign({
        data: {
          id: user._id,
          username: user.username
        }
        }, process.env.SECRET, { expiresIn: '12h' });

      return res.status(201).json({
        success: true,
        token
      });
    });
  }
}

module.exports = User;