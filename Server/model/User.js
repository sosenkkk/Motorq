const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, default: "New" },
  lastName: { type: String, default: "User" },
  phoneNo: { type: Number },
  vehical: [
    {
      type: Schema.Types.ObjectId,
      ref: "Vehicals",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
