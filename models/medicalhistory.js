const mongoose = require("mongoose");

const medicalHistorySchema = new mongoose.Schema({
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
