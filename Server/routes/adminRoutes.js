const express = require("express");
const adminController = require("../controller/adminController")
const router = express.Router();

router.get('/user-requests', adminController.getUserRequests )

router.post('/add-vehicle', adminController.addVehicleMMY )

router.post('/accept-reject', adminController.acceptrejectReq)







module.exports = router;




