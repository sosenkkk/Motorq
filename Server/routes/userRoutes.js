const express = require("express");
const userController = require("../controller/userController")
const router = express.Router();



router.get('/get-vehiclemmy', userController.getVehicleData );

router.post('/enroll-request', userController.enrollVehicleRequest);

router.get('/user-requests', userController.getYourRequests );


module.exports = router;

