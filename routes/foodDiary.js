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
const verifyToken = require("../auth/tokenverify");
const jwt = require("jsonwebtoken");

//test all
foodDiaryRouter.get("/", async (req, res) => {
  try {
    res.json({ message: "hello admin!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create food diary (or save calorie calculator data)
foodDiaryRouter.post("/create", verifyToken, async (req, res) => {
  console.log("req food diary create: ", req.body);

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
  console.log("userData", userData);

  const foodDiary = new FoodDiary({
    UserId: userData.UserId,
    Email: userData.Email,
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

// fetch all food diary records
foodDiaryRouter.post("/fetch", verifyToken, async (req, res) => {
  console.log("req food diary fetch all: ", req.body);

  try {
    const userData = jwt.verify(
      req.token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, authData) => {
        if (err) {
          console.log(err);
        } else return authData;
      }
    );

    let diaryData = await FoodDiary.find({
      Date: req.body.Date,
      Email: userData.Email,
    });
    console.log("diaryData", diaryData);
    if (diaryData === []) {
      res.status(400).json({
        status: "success",
        message: "Records not found",
        data: null,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Found Records",
        data: diaryData,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// aggregation pipeline
const graphPipeline = async () => {
  const pipeline = [
    {
      $group: {
        _id: {
          Email: "$Email",
          Date: "$Date",
        },
        totalForDay: {
          $sum: "$totalMealCalorie",
        },
      },
    },
  ];
  const result = await db.collection("fooddiaries").aggregate(pipeline);
  const resultArray = await result.toArray();
  //console.log("resultAsArray", resultArray);
  return resultArray;
};

// fetch calorie consumption data to draw a graph
foodDiaryRouter.post("/fetchByTimeRange", verifyToken, async (req, res) => {
  console.log("req food diary fetch time range: ", req.body);

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
    // format array created in aggregation pipeline
    const pipelineData = await graphPipeline();

    const graphDataArray = _.filter(pipelineData, {
      _id: { Email: userData.Email },
    });
    //console.log("graphDataArray", graphDataArray);

    let graphDataArrayFormatted = [];
    for (let i = 0; i < graphDataArray.length; i++) {
      graphDataArrayFormatted.push({
        date: moment(graphDataArray[i]._id.Date, "YYYY-MM-DD").format(
          "YYYY-MM-DD"
        ),
        totCaloriePerDay: graphDataArray[i].totalForDay,
      });
    }
    // console.log("graphDataArrayFormatted", graphDataArrayFormatted);

    const start = moment(req.body.StartDate).format("YYYY-MM-DD");
    //console.log("StartDate", start);
    const end = moment(req.body.EndDate).format("YYYY-MM-DD");
    //console.log("endDate", end);
    const range = moment.range(start, end);
    array = Array.from(range.by("days"));
    let dateRange = [];
    for (let i = 0; i < array.length; i++) {
      dateRange.push({
        date: moment(array[i], "YYYY-MM-DD").format("YYYY-MM-DD"),
      });
    }
    //console.log("dateRange", dateRange);

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
    //console.log("finalDataSet", finalDataSet);

    let graphLabels = [];
    graphLabels = _.map(finalDataSet, "date");
    console.log("graphLabels", graphLabels);

    let graphData = [];
    graphData = _.map(finalDataSet, "totCaloriePerDay");
    console.log("graphData", graphData);

    res.status(200).json({
      status: "success",
      message: "Found Records",
      data: [graphLabels, graphData],
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = foodDiaryRouter;
