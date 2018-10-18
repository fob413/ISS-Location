class Validation {
  static validateSignup (req, res, next) {
    if (
      req.body.username &&
      req.body.username.trim() &&
      req.body.email &&
      req.body.email.trim() &&
      req.body.password &&
      req.body.password.length > 5 &&
      req.body.confirmPassword &&
      req.body.password === req.body.confirmPassword
      ) {
      next();
    } else {
      let error = new Error('Username, email, password and confirmPasswrod are required');
      error.status = 400;
      next(error);
    }
  }

  static validateSignin (req, res, next) {
    if (
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
}

module.exports = Validation;