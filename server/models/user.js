import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// hash passsword before saving to database
UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

// authenticate user signin
UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({ email: email })
    .exec(function(error, user) {
      if (error) return callback(error);

      if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }

      bcrypt.compare(password, user.password, function(error, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      });
    });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
