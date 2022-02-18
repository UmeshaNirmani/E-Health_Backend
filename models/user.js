const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Title: {
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

module.exports = mongoose.model("user", userSchema);
