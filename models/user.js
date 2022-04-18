const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
    enum: ["Rev/Hon.", "Dr.", "Mr.", "Mrs.", "Ms."],
  },
  Role: {
    type: String,
    required: true,
    enum: ["Doctor", "Patient", "SystemAdministrator"],
  },
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  Email: {
    type: String,
    unique: true,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  Phone: {
    type: Number,
  },
  DOB: {
    type: Date,
  },
  CurrentLiving: {
    type: String,
    enum: ["Home", "OutSide"],
  },
  NIC: {
    type: String,
  },
  Address: {
    type: String,
  },
  Job: {
    type: String,
    enum: ["Executive", "GovernmentOfficer", "Labour", "Other"],
  },
  Education: {
    type: String,
    enum: ["AL", "Graduated", "Mastered"],
  },
  FoodPreference: {
    type: String,
    enum: ["Vegetarian", "NonVegetarian", "LactoOvoVegetarians"],
  },
  District: {
    type: String,
    enum: ["Colombo", "Kegalle", "Ratnapura"],
  },
  Height: {
    type: Number,
  },
  Weight: {
    type: Number,
  },
  SLMC: {
    type: String,
  },
  Hospital: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
