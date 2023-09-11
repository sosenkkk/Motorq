const Vehicle = require("../model/VehicleMMY");
const Request = require("../model/Request");
const User = require("../model/User");
var mongoose = require("mongoose");

exports.getVehicleData = async (req, res, next) => {
  try {
    const vehiclemmydata = await Vehicle.find();
    console.log(vehiclemmydata);
    res
      .status(200)
      .json({ message: "Data fetched", vehiclemmy: vehiclemmydata });
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.enrollVehicleRequest = async (req, res, next) => {
  const vin = req.body.vin;
  const make = req.body.make;
  const model = req.body.model;
  const year = req.body.year;
  const status = req.body.status;
  const userId = req.body.userId;

  try {
    var id = new mongoose.Types.ObjectId(userId);
    console.log(id);
    const user = User.findOne({ _id: id });
    const checkReq = await Request.findOne({
      make: make,
      model: model,
      vin: vin,
      year: year,
      status: status,
    });
    if (checkReq) {
      res.status(433).json({ message: "Request enrolled already!" });
    } else {
      const request = new Request({
        userId: id,
        make: make,
        model: model,
        vin: vin,
        year: year,
        status: status,
      });

      const result = await request.save();

      res.status(201).json({ message: "Request enrolled successfully!" });
    }
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.getYourRequests = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    console.log(userId)
    const requests = await Request.find(); //{userId: new mongoose.Types.ObjectId(userId)}
    console.log(requests);
    res
      .status(200)
      .json({ message: "Data fetched", requests: requests });
  } catch (err) {
    console.log(err);
    next();
  }
};
