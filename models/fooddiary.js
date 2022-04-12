const req = require("express/lib/request");
const mongoose = require("mongoose");

const foodDiarySchema = new mongoose.Schema({
  UserId: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
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
      FoodTableId: {
        type: String,
        required: true,
      },
      Food: {
        type: String,
        required: true,
      },
      Servings: {
        type: Number,
        required: true,
      },
      Unit: {
        type: String,
        required: true,
      },
      UnitCalorieAmount: {
        type: Number,
        required: true,
      },
    },
  ],
  totalMealCalorie: { type: Number, defaultValue: 0 },
});

module.exports = mongoose.model("fooddiary", foodDiarySchema);
