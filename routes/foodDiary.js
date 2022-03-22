const express = require("express");
const foodDiaryRouter = express.Router();
const FoodDiary = require("../models/foodDiary");

//test all
foodDiaryRouter.get("/", async (req, res) => {
  try {
    res.json({ message: "hello admin!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

foodDiaryRouter.post("/create", async (req, res) => {
  const foodDiary = new FoodDiary({
    Date: req.body.Date,
    MealType: req.body.MealType,
    Food: req.body.Food,
    ServingsAmount: req.body.ServingsAmount,
  });

  try {
    // const tableData = await FoodDiary.find({
    //   MealType: req.body.MealType,
    //   Food: req.body.Food,
    // });
    const newRecord = await foodDiary.save();
    res.status(200).json({
      status: "success",
      message: "Record Added",
      data: [],
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = foodDiaryRouter;
