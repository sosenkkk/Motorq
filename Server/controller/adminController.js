const Vehicle = require("../model/VehicleMMY");
const Request = require("../model/Request");
const { default: mongoose } = require("mongoose");

exports.addVehicleMMY = async (req, res, next) => {
  const make = req.body.make;
  const model = req.body.model;
  const year = req.body.year;
  const vin = req.body.vin;
  try {
    const enteredVehicleMMY = await Vehicle.findOne({
      make: make,
      model: model,
      year: year,
    });
    const enteredVehicleVIN = await Vehicle.findOne({ vin: vin });
    if (enteredVehicleMMY) {
      res.status(433).json({ message: "This MMY already exists." });
    } else if (enteredVehicleVIN) {
      res.status(433).json({ message: "This VIN already exists." });
    } else {
      const vehicle = new Vehicle({
        make: make,
        model: model,
        year: year,
        vin: vin,
      });
      const result = await vehicle.save();
      res.status(201).json({
        message: "Vehicle Data added successfully!",
        userId: result._id,
      });
    }
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.getUserRequests = async (req, res, next) => {
  try {
    const requests = await Request.find();
    console.log("fetched for admin");
    res.status(200).json({ message: "Data fetched", requests: requests });
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.acceptrejectReq = async (req, res, next) => {
  try {
    const reqdo = req.body.valueAR;
    const reqid = req.body.id;
    console.log(reqdo)
    if (reqdo == "accept") {
      const changed = await Request.updateOne(
        { id: new mongoose.Types.ObjectId(reqid) }, {status : "Accepted"}
      );
    
    } else if (reqdo == "reject") {
      const changed = await Request.updateOne({
        id: new mongoose.Types.ObjectId(reqid),
      },{status : "Rejected"})
      
    }
  } catch (err) {
    console.log(err);
    next();
  }
};
