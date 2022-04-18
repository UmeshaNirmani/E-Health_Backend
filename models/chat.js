const req = require("express/lib/request");
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  UserId: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Chat", chatSchema);
