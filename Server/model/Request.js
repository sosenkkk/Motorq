const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    vin: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
