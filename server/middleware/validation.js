import UserModel from '../models/user';
import jwt from 'jsonwebtoken';
import config from './config';

const { secret, seedAdmin } = config;

class Validation {
  static validateSignup (req, res, next) {
    if (
      req.body.username &&
      req.body.username.trim() &&
      req.body.email &&
      req.body.email.trim() &&
      req.body.password &&
      req.body.password.length > 5 &&
      req.body.confirmPassword
      ) {

        if ( req.body.password === req.body.confirmPassword ) {
          return next();
        }
        
        let error = new Error("Passwords don't match");
        error.status = 400;
        return next(error);
    } else {
      let error = new Error('Username, email, password and confirmPasswrod are required');
      error.status = 400;
      return next(error);
    }
  }

  static validateSignin (req, res, next) {
    if (
      req.body.email &&
      req.body.email.trim() &&
      req.body.password
    ) {
      next();
    } else {
      let error = new Error("Username and password are required");
      error.status = 400;
      next(error);
    }
  }

  static validateUserDuplicates (req, res, next) {
    UserModel.duplicateCheck(req.body.email, req.body.username, function (error) {
      if (error) {
        return next(error);
      } else {
        next();
      }
    }); 
  }

  static validateToken (req, res, next) {
    const { token } = req.headers;
    if (token) {
      // verifies secret and checks exp
        jwt.verify(token, secret, (err, decoded) => {
          if (err) { // failed verification.
            return res.status(401).send({
              success: false,
              message: 'Failed to authenticate token'
            });
          }
          req.decoded = decoded;
          next(); // no error, proceed
        });
      } else {
        // forbidden without token
        return res.status(403).send({
          success: false,
          message: 'No token provided'
        });
      }
  }

  static validateSeed (req, res, next) {
    const { seedadmin } = req.headers;
    if (seedadmin) {
      if (seedadmin === seedAdmin) {
        next();
      } else {
        // forbidden
        return res.status(403).send({
          success: false,
          message: 'You are not authorized for this action'
        });
      }
    } else {
      // forbidden
      return res.status(403).send({
        success: false,
        message: 'You are not authorized for this action'
      });
    }
  }
}

module.exports = Validation;