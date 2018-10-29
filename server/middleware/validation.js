import UserModel from '../models/user';

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

  static validateDuplicates (req, res, next) {
    UserModel.duplicateCheck(req.body.email, req.body.username, function (error) {
      if (error) {
        return next(error);
      } else {
        next();
      }
    }); 
  }
}

module.exports = Validation;