const express = require("express");
const adminController = require("../controller/admin/adminController")
const router = express.Router();



router.post('/add-vehical', adminController.addVehical )




module.exports = router;



