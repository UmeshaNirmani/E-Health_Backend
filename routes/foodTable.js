const express = require("express");
const foodTableRouter = express.Router();
const FoodTable = require("../models/foodTable");

foodTableRouter.post("/addrecords", async (req, res) => {
  const foodTable = new FoodTable({
    Food: req.body.Food,
    UnitCalorieAmount: req.body.UnitCalorieAmount,
  });
  try {
    const newRecord = await foodTable.save();
    res.status(200).json({
      status: "success",
      message: "Record Added",
      data: [],
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = foodTableRouter;
