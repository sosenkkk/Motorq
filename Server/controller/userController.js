const Vehical = require("../model/VehicalMMY");

exports.getVehicalData = async (req, res, next) => {
  try {
    const vehicalmmydata = await Vehical.find();
    console.log(vehicalmmydata);
    res.status(200).json({message:"Data fetched", vehicalmmy: vehicalmmydata})
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.enrollVehical = async(req, res, next)=>{
    
}