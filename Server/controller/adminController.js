const Vehical = require("../model/VehicalMMY");

exports.addVehical = async (req, res, next) => {

  const make = req.body.make;
  const model = req.body.model;
  const year = req.body.year;
  const vin = req.body.vin;
  try {
    const enteredVehicalMMY = await Vehical.findOne({
      make: make,
      model: model,
      year: year,
    });
    const enteredVehicalVIN = await Vehical.findOne({ vin: vin });
    if (enteredVehicalMMY) {
      res.status(433).json({ message: "This MMY already exists." });
    } else if (enteredVehicalVIN) {
      res.status(433).json({ message: "This VIN already exists." });
    } else {
      const vehical = new Vehical({
        make: make,
        model: model,
        year: year,
        vin: vin,
      });
      const result = await vehical.save();
      res
      .status(201)
      .json({ message: "Vehical Data added successfully!", userId: result._id });
    }
  } catch (err) {
    console.log(err);
    next();
  }
};
