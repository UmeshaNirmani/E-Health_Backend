const express = require("express");
const CalorieCalculator = require("../models/foodtable");
const calorieCalculatorRouter = express.Router();
const verifyToken = require("../auth/tokenverify");

// test all
calorieCalculatorRouter.get("/", async (req, res) => {
  try {
    res.json({ message: "hello admin!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

calorieCalculatorRouter.post(
  "/caloriecalculator",
  verifyToken,
  async (req, res) => {
    try {
      const Foods = await CalorieCalculator.find({}).select("-__v");
      res.status(200).json({
        status: "success",
        message: "Found Records",
        data: Foods,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = calorieCalculatorRouter;
