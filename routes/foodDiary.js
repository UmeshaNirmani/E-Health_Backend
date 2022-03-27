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
  console.log("req food diary create: ", req.body);
  const foodDiary = new FoodDiary({
    Date: req.body.Date,
    MealType: req.body.MealType,
    FoodDetails: req.body.FoodDetails,
    totalMealCalorie: req.body.totalMealCalorie,
  });
  try {
    const newRecord = await foodDiary.save();
    res.status(200).json({
      status: "success",
      message: "Record Added",
      data: newRecord,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

foodDiaryRouter.post("/fetch", async (req, res) => {
  console.log("req food diary fetch: ", req.body);
  let selectedDate = req.body.Date;
  try {
    let diaryData = await FoodDiary.find({ Date: selectedDate });
    res.status(200).json({
      status: "success",
      message: "Found Records",
      data: diaryData,
    });
    if ((diaryData = null)) {
      res.status(200).json({
        status: "success",
        message: "Records not fount",
        data: [],
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = foodDiaryRouter;
