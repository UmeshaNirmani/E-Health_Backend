const express = require("express");
const foodTableRouter = express.Router();
const FoodTable = require("../models/foodtable");
const verifyToken = require("../auth/tokenverify");

// test all
foodTableRouter.get("/", async (req, res) => {
  try {
    res.json({ message: "hello admin!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

foodTableRouter.post("/create", verifyToken, async (req, res) => {
  const foodTable = new FoodTable({
    Food: req.body.Food,
    UnitCalorieAmount: req.body.UnitCalorieAmount,
    Unit: req.body.Unit,
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

foodTableRouter.post("/fetch", verifyToken, async (req, res) => {
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

foodTableRouter.post("/update", verifyToken, async (req, res) => {
  console.log("req update: ", req.body);
  try {
    const updateObject = {
      Food: req.body.Food,
      UnitCalorieAmount: req.body.UnitCalorieAmount,
    };
    const updateResult = await FoodTable.findByIdAndUpdate(
      req.body.recordId,
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

foodTableRouter.post("/delete", verifyToken, async (req, res) => {
  try {
    const tableData = await FoodTable.findByIdAndDelete(req.body.TableDataId);
    res.status(200).json({
      status: "success",
      message: "Record Deleted!",
      data: tableData,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = foodTableRouter;
