const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");

// test all
userRouter.get("/", async (req, res) => {
  try {
    res.json({ message: "hello users!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

userRouter.post("/signup", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.Password, 10);
  const user = new userModel({
    Title: req.body.Title,
    Role: req.body.Role,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
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
  const userAuth = await userModel.find({
    Email: req.body.Email,
  });
  if (userAuth === null) {
    res.status(400).json({
      status: "error",
      message: "User not Found",
      data: null,
    });
  } else {
  }
  try {
    if (bcrypt.compare(req.body.Password, userAuth.Password)) {
      res.status(200).json({
        status: "success",
        message: "User Found!",
        data: userAuth,
      });
    } else {
      res.status(200).json({
        status: "error",
        message: "Unauthorized User!",
        data: null,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = userRouter;
