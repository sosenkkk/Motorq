const express = require("express");
const adminController = require("../controller/adminController")
const router = express.Router();



router.post('/add-vehicle', adminController.addVehicleMMY )




module.exports = router;




