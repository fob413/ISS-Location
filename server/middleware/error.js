class Error {
  static notFound (req, res, next) {
    let error = new Error("Not Found");
    error.status = 404;
    error.message = "Not found";
    next(error);
  }

  static handler (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      error: {
        message: err.message
      }
    });
  }
}

module.exports = Error;
