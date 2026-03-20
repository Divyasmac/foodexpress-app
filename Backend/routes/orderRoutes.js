const express = require("express");
const router = express.Router();
 
const verifyToken = require("../middleware/varifytoken");
 
const {
  placeOrder,
  getOrders
} = require("../controllers/ordercontroller");
 
router.post("/order", verifyToken, placeOrder);
router.get("/myorders", verifyToken, getOrders);
 
module.exports = router;