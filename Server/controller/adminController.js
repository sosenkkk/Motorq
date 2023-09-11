const Vehicle = require("../model/VehicleMMY");

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
      res
      .status(201)
      .json({ message: "Vehicle Data added successfully!", userId: result._id });
    }
  } catch (err) {
    console.log(err);
    next();
  }
};
