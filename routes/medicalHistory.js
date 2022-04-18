const express = require("express");
const MedicalHistory = require("../models/medicalhistory");
const medicalHistoryRouter = express.Router();
const verifyToken = require("../auth/tokenverify");

// test all
medicalHistoryRouter.get("/", async (req, res) => {
  try {
    res.json({ message: "hello admin!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create
medicalHistoryRouter.post("/create", verifyToken, async (req, res) => {
  console.log("req create: ", req.body);
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
  const medicalHistory = new MedicalHistory({
    UserId: userData.UserId,
    Email: userData.Email,
    Disease: req.body.Disease,
    DrugHistory: req.body.DrugHistory,
    Investigations: req.body.Investigations,
  });
  try {
    console.log("medicalHistory: ", medicalHistory);
    const newRecord = await medicalHistory.save();
    res.status(200).json({
      status: "success",
      message: "Record saved",
      data: newRecord,
    });
  } catch (error) {
    console.error("Catch error: ", error);
    res.status(400).json({
      status: "error",
      message: "Error saving",
      data: [],
    });
  }
});

// fetch all
medicalHistoryRouter.post("/", verifyToken, async (req, res) => {
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
    let medicalHistory = await MedicalHistory.find({ UserId: userData.UserId });
    res.status(200).json({
      status: "success",
      message: "Record found",
      data: medicalHistory,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Error finding",
      data: [],
    });
  }
});

module.exports = medicalHistoryRouter;
