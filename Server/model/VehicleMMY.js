const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vehicalMMYSchema = new Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    vin: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicalMMYSchema);