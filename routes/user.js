const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const saltRounds = 10;

// test all
userRouter.get("/", async (req, res) => {
  try {
    res.json({ message: "hello users!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

userRouter.post("/signup", async (req, res) => {
  console.log("inputs", req.body);
  const hashedPassword = await bcrypt.hash(req.body.Password, saltRounds);
  const user = new userModel({
    Title: req.body.Title,
    Role: req.body.Role,
    Email: req.body.Email,
    Password: hashedPassword,
  });
  try {
    const newUser = await user.save();
    res.status(200).json({
      status: "success",
      message: "User Created",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.post("/signin", async (req, res) => {
  console.log("inputs", req.body);

  try {
    const userAuth = await userModel.findOne({
      Email: req.body.Email,
    });
    if (!userAuth) {
      return res.status(400).json({
        status: "error",
        message: "User not found!",
        data: null,
      });
    }

    const isMatch = await bcrypt.compare(req.body.Password, userAuth.Password);
    const accessToken = jwt.sign(
      {
        UserId: userAuth._id,
        Email: userAuth.Email,
        Role: userAuth.Role,
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    const responseData = {
      Id: userAuth._id,
      Title: userAuth.Title,
      Role: userAuth.Role,
      Email: userAuth.Email,
      accessToken: accessToken,
    };

    if (isMatch) {
      res.status(200).json({
        status: "success",
        message: "User Found!",
        data: responseData,
      });
    } else {
      res.status(400).json({
        status: "error",
        message: "Incorrect password!",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Authentication error",
      data: error.message,
    });
  }
});

module.exports = userRouter;
