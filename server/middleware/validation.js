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
      let error = new Error('Valid json object is required');
      error.status = 400;
      next(error);
    }
  }
}

module.exports = Validation;