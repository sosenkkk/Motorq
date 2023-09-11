const Vehicle = require("../model/VehicleMMY");

exports.getVehicleData = async (req, res, next) => {
  try {
    const vehiclemmydata = await Vehicle.find();
    console.log(vehiclemmydata);
    res.status(200).json({message:"Data fetched", vehiclemmy: vehiclemmydata})
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.enrollVehicleRequest = async(req, res, next)=>{
    const vin = req.body.vin;
    const make = req.body.make;
    const model = req.body.model;
    const year = req.body.year;
}