const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    unique: true,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
