const mongoose = require("mongoose");

const medicalHistorySchema = new mongoose.Schema({
  UserId: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Disease: {
    type: String,
    required: true,
  },
  DrugHistory: {
    type: String,
    required: true,
  },
  Investigations: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("MedicalHistory", medicalHistorySchema);
