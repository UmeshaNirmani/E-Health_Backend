const mongoose = require("mongoose");

const calorieCalculatorSchema = new mongoose.Schema({
  Date: {
    type: String,
    required: true,
  },
  MealType: {
    type: String,
    required: true,
  },
  Food: {
    type: String,
    required: true,
  },
  UnitCalorieAmount: {
    type: String,
    required: true,
  },
  ServingsAmount: {
    type: String,
    required: true,
  },
  ServingsUnit: {
    type: String,
    required: true,
  },
  TotalCalorie: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("calorieCalculator", calorieCalculatorSchema);
