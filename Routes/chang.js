const express = require("express");
const router = express.Router();

// controllers
const {
    changeOrderStatus,
    getOrderAdmin,
    
    
  } = require("../Controllers/chang");

// middleware
const { auth ,admin } = require('../Middleware/auth')





//@Endpoint  http://localhost:5000/api/chang/order-status
//@Method    PUT
//@Access    Private
router.put("/admins/order-status", auth, changeOrderStatus);
router.get("/admins/orders", getOrderAdmin);


module.exports = router;