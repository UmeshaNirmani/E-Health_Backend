const req = require("express/lib/request");
const mongoose = require("mongoose");

const groupchatSchema = new mongoose.Schema({
  GroupId: {
    type: String,
    required: true,
  },
  GroupName: {
    type: String,
    required: true,
  },
  users: [
    {
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
      message: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("GroupChat", groupchatSchema);
