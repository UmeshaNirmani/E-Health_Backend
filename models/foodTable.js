const mongoose = require("mongoose");

const foodTableSchema = new mongoose.Schema({
  Food: {
    type: String,
    required: true,
  },
  UnitCalorieAmount: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("foodTable", foodTableSchema);
