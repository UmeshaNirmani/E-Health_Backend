const express = require("express");
const Chat = require("../models/chat");
const chatRouter = express.Router();
const Moment = require("moment");
const verifyToken = require("../auth/tokenverify");
const jwt = require("jsonwebtoken");

chatRouter.post("/create", verifyToken, async (req, res) => {
  const userData = jwt.verify(
    req.token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, authData) => {
      if (err) {
        console.log(err);
        return err;
      } else return authData;
    }
  );

  const currentTime = moment().format();
  const chat = new Chat({
    Email: userData.Email,
    FirstName: userData.FirstName,
    Role: userData.Role,
    TimeStamp: currentTime,
    Message: req.body.Message,
  });

  try {
    const newRecord = await chat.save();
    res.status(200).json({
      status: "success",
      message: "Record Added",
      data: newRecord,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// fetch all for patient-doctor chats
chatRouter.post("/", verifyToken, async (req, res) => {
  const userData = jwt.verify(
    req.token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, authData) => {
      if (err) {
        console.log(err);
        return err;
      } else return authData;
    }
  );
  try {
    let chatHistory = await Chat.find({ UserId: userData.UserId });
    res.status(200).json({
      status: "success",
      message: "Record found",
      data: chatHistory,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Error finding",
      data: [],
    });
  }
});

module.exports = chatRouter;
