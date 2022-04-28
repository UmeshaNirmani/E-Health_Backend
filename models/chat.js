const req = require("express/lib/request");
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  FirstName: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
  TimeStamp: {
    type: Date,
    required: true,
  },
  Message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Chat", chatSchema);
