const express = require("express");
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
const foodDiaryRouter = express.Router();
const FoodDiary = require("../models/foodDiary");
const Moment = require("moment");
const MomentRange = require("moment-range");
const moment =
  MomentRange.extendMoment(Moment); /*add plugin to moment instance*/
const _ = require("lodash");

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
  let diaryData = await FoodDiary.find({ Date: selectedDate });
  console.log("diaryData", diaryData);
  if (diaryData === []) {
    res.status(400).json({
      status: "success",
      message: "Records not found",
      data: null,
    });
  }

  try {
    res.status(200).json({
      status: "success",
      message: "Found Records",
      data: diaryData,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// aggregation pipeline
const graphData = async () => {
  const pipeline = [
    {
      $group: {
        _id: "$Date",
        totalForDay: {
          $sum: "$totalMealCalorie",
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ];
  const result = await db.collection("fooddiaries").aggregate(pipeline);
  const resultArray = await result.toArray();
  //console.log("resultAsArray", resultArray);
  return resultArray;
};

foodDiaryRouter.post("/fetchByTimeRange", async (req, res) => {
  console.log("req food diary fetch: ", req.body);

  // format array created in aggregation pipeline
  const graphDataArray = await graphData();
  //console.log("graphDataArray", graphDataArray);
  let graphDataArrayFormatted = [];
  for (let i = 0; i < graphDataArray.length; i++) {
    graphDataArrayFormatted.push({
      date: moment(graphDataArray[i]._id, "YYYY-MM-DD").format("YYYY-MM-DD"),
      totCaloriePerDay: graphDataArray[i].totalForDay,
    });
  }
  console.log("graphDataArrayFormatted", graphDataArrayFormatted);

  // creating the array of dates within the given time range
  let diaryData = await FoodDiary.find({
    Date: { $gte: req.body.DateStart, $lte: req.body.DateEnd },
  });
  const start = moment(req.body.DateStart, "YYYY-MM-DD");
  const end = moment(req.body.DateEnd, "YYYY-MM-DD");
  const range = moment.range(start, end);
  array = Array.from(range.by("days"));
  let dateRange = [];
  for (let i = 0; i < array.length; i++) {
    dateRange.push({
      date: moment(array[i], "YYYY-MM-DD").format("YYYY-MM-DD"),
    });
  }
  console.log("dateRange", dateRange);

  //match the 2 arrays and create the resulting data set
  let finalDataSet = [];
  for (let i = 0; i < dateRange.length; i++) {
    let result = _.find(graphDataArrayFormatted, { date: dateRange[i].date });
    if (result === undefined) {
      finalDataSet.push({ date: dateRange[i].date, totCaloriePerDay: 0 });
    } else {
      finalDataSet.push(result);
    }
  }
  console.log("finalDataSet", finalDataSet);

  try {
    res.status(200).json({
      status: "success",
      message: "Found Records",
      data: finalDataSet,
    });
    if (diaryData == null) {
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
