const express = require("express");
const foodTableRouter = express.Router();
const FoodTable = require("../models/foodTable");

// test all
foodTableRouter.get("/", async (req, res) => {
  try {
    res.json({ message: "hello admin!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

foodTableRouter.post("/fetch", async (req, res) => {
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

foodTableRouter.post("/create", async (req, res) => {
  const foodTable = new FoodTable({
    Food: req.body.Food,
    UnitCalorieAmount: req.body.UnitCalorieAmount,
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

foodTableRouter.post("/update", async (req, res) => {
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

foodTableRouter.post("/deleteById", async (req, res) => {
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

module.exports = foodTableRouter;
