const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../auth/tokenverify");
const saltRounds = 10;

// test all
// userRouter.get("/", async (req, res) => {
//   try {
//     res.json({ message: "hello users!", data: "hello users!" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

userRouter.post("/profile", verifyToken, async (req, res) => {
  //console.log("token", req.token);
  const userData = jwt.verify(
    req.token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, authData) => {
      if (err) {
        console.log("err",err);
        return err;
      } else  return authData; //console.log("authData", authData);
    }
  );

  try {
    let userProfile = await userModel.findById(userData.UserId);   
    res.status(200).json({
      status: "success",
      message: "Records found",
      data: userProfile,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Error finding",
      data: [],
    });
  }
});

userRouter.post("/signup", async (req, res) => {
  console.log("inputs signup", req.body);
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

userRouter.post("/fetch", async (req, res) => {
  try {
    const tableData = await userModel.find({});
    console.log("tableData", tableData);
    res.status(200).json({
      status: "success",
      message: "Found Records",
      data: tableData,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.post("/update", verifyToken, async (req, res) => {
  console.log("req user update: ", req.body);
  const hashedPassword = await bcrypt.hash(req.body.Password, saltRounds);
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
    const updateObject = {
      Title: req.body.Title,
      Role: req.body.Role,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      Password: hashedPassword,
      Gender: req.body.Gender,
      Phone: req.body.Phone,
      DOB: req.body.DOB,
      CurrentLiving: req.body.CurrentLiving,
      NIC: req.body.NIC,
      Address: req.body.Address,
      Job: req.body.Job,
      Education: req.body.Education,
      FoodPreference: req.body.FoodPreference,
      District: req.body.District,
      Height: req.body.Height,
      Weight: req.body.Weight,
      SLMC: req.body.SLMC,
      Hospital: req.body.Hospital,
    };
    const updateResult = await userModel.findByIdAndUpdate(
      req.body.userId,
      updateObject,
      { new: true }
    );

    console.log("updated result: ", updateResult);
    if (updateResult) {
      return res.status(200).json({
        status: "success",
        message: "Found Records",
        data: updateResult,
      });
    } else {
      return res.status(200).json({
        status: "error",
        message: "Record Not Found.",
        data: updateResult,
      });
    }
  } catch (error) {
    console.error("catch error: ", error);
    res.status(400).json({ message: error.message });
  }
});

userRouter.post("/signin", async (req, res) => {
  console.log("inputs login", req.body);

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
        FirstName: userAuth.FirstName,
        Role: userAuth.Role,
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    const responseData = {
      Id: userAuth._id,
      Title: userAuth.Title,
      Role: userAuth.Role,
      FirstName: userAuth.FirstName,
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
