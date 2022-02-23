const express = require("express");
const calorieCalculatorRouter = express.Router();
const CalorieCalculator = require("../models/calorieCalculator");

// test all
calorieCalculatorRouter.get("/", async (req, res) => {
  try {
    res.json({ message: "hello admin!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = calorieCalculatorRouter;
