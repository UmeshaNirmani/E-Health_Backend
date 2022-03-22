const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
import crypto from "crypto";

const SALT_ROUNDS = 5;

const userSchema = new mongoose.Schema({
  Titue: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", function (next) {
  var user = this;
  bcrypt.genSalt(SALT_ROUNDS, function (err, salt) {
    bcrypt.hash(user.Password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.Password = hash;
      next();
    });
  });
});

userSchema.methods.saltAndHashPassword = function (Password, cb) {
  bcrypt.genSalt(SALT_ROUNDS, function (err, salt) {
    bcrypt.hash(Password, salt, function (err, hash) {
      if (err) {
        return cb(err);
      } else {
        return cb(null, hash);
      }
    });
  });
};

userSchema.methods.comparePassword = function (passwordAttempt, cb) {
  bcrypt.compare(passwordAttempt, this.Password, function (err, isMatch) {
    if (err) {
      return cb(err);
    } else {
      return cb(null, isMatch);
    }
  });
};

userSchema.methods.isUserActive = function (cb) {
  var user = this;
  if (user.status.isActive) {
    return cb(null, true);
  } else {
    return cb(new Error("user not activated"));
  }
};

module.exports = mongoose.model("user", userSchema);
