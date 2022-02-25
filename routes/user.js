const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

// test all
userRouter.get("/", async (req, res) => {
  try {
    res.json({ message: "hello users!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

userRouter.post("/signup", async (req, res) => {
  const user = new User({
    Title: req.body.Title,
    Role: req.body.Role,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,
    Password: req.body.Password,
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
  try {
    let users = await User.find({
      Email: req.body.Email,
      Password: req.body.Password,
    });
    if (users.length > 0) {
      res.status(200).json({
        status: "success",
        message: "User Found",
        data: users,
      });
    } else {
      res.status(200).json({
        status: "error",
        message: "Unauthorized User!",
        data: users,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = userRouter;
