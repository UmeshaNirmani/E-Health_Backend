const express = require("express");
const Chat = require("../models/chat");
const chatRouter = express.Router();
const verifyToken = require("../auth/tokenverify");
const jwt = require("jsonwebtoken");

chatRouter.post("/chat", verifyToken, async (req, res) => {
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

  const chat = new Chat({
    Email: userData.Email,
    FirstName: userData.FirstName,
    Role: userData.Role,
    TimeStamp: req.body.TimeStamp,
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

module.exports = chatRouter;
