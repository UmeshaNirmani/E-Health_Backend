const mongoose = require("mongoose");

const foodTableSchema = new mongoose.Schema({
  UserId: {
    type: String,
    required: true,
  },
  Email: {
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
  Unit: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("foodtable", foodTableSchema);
