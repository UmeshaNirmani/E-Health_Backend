const req = require("express/lib/request");
const mongoose = require("mongoose");

const foodDiarySchema = new mongoose.Schema({
  Date: {
    type: Date,
    required: true,
  },
  MealType: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner", "Tea Time"],
    required: true,
  },
  FoodDetails: [
    {
      Food: {
        type: String,
        required: true,
      },
      UnitCalorieAmount: {
        type: Number,
        required: true,
      },
      Unit: {
        type: String,
        required: true,
      },
      ServingsAmount: {
        type: Number,
        required: true,
      },
    },
  ],
  MealTotalCalories: { type: Number, defaultValue: 0 },
});

module.exports = mongoose.model("fooddiary", foodDiarySchema);
