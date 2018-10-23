import request from 'request';

class Iss {
  static location (req, res, next) {
    request.get("http://api.open-notify.org/iss-now.json", (err, location) => {
      if (err) next(err);

      return res.json({
        success: true,
        location: JSON.parse(location.body).iss_position
      });
    });
  }
}

module.exports = Iss;
