const express = require("express");
const bookingController = require("../controllers/booking");

const router = express.Router();

// Define routes
router.post("/", bookingController.createBooking);
router.get("/", bookingController.getBookings);
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
