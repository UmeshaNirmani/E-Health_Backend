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

calorieCalculatorRouter.post("/create", async (req, res) => {
  const calorieCalculator = new CalorieCalculator({
    Date: req.body.Date,
    MealType: req.body.MealType,
    Food: req.body.Food,
    ServingsAmount: req.body.ServingsAmount,
    ServingsUnit: req.body.ServingsUnit,
  });
  try {
    const newRecord = await foodTable.save();
    res.status(200).json({
      status: "success",
      message: "Record Added",
      data: newRecord,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

calorieCalculatorRouter.post("/fetch", async (req, res) => {
  try {
    const tableData = await FoodTable.find({});
    res.status(200).json({
      status: "success",
      message: "Found Records",
      data: tableData,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = calorieCalculatorRouter;
