import UserModel from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../middleware/config';

const { secret } = config;

class User {
  static signup (req, res, next) {
    let userData = {
      username: req.body.username.trim(),
      email: req.body.email.trim(),
      password: req.body.password
    };

    UserModel.create(userData, (err, user) => {
      if (err) {
        return next(err);
      }
      
      const token = jwt.sign({
        data: {
          id: user._id,
          username: user.username
        }
        }, secret, { expiresIn: '12h' });

      return res.status(201).json({
        success: true,
        token
      });
    });
  }

  static signin (req, res, next) {
    UserModel.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        let err = new Error("Wrong email or password");
        err.status = 401;
        return next(err);
      } else {
        const token = jwt.sign({
          data: {
            id: user._id,
            username: user.username
          }
        }, secret, { expiresIn: '12h' });

        return res.json({
          success: true,
          token
        });
      }
    });
  }
}

module.exports = User;