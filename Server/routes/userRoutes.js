const express = require("express");
const userController = require("../controller/userController")
const router = express.Router();



router.get('/get-vehicalmmy', userController.getVehicalData );

router.post('enroll-request', userController.enrollVehical)




module.exports = router;

