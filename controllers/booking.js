const bookingModel = require("../models/booking");

const createBooking = (req, res) => {
  const { name, date, time } = req.body;

  if (!name || !date || !time) {
    return res
      .status(400)
      .json({ error: "Name, date, and time are required." });
  }

  const newBooking = bookingModel.addBooking(name, date, time);
  res
    .status(201)
    .json({ message: "Booking created successfully.", booking: newBooking });
};

const getBookings = (req, res) => {
  const bookings = bookingModel.getAllBookings();
  res.json(bookings);
};

const deleteBooking = (req, res) => {
  const { id } = req.params;
  const deletedBooking = bookingModel.deleteBookingById(parseInt(id));

  if (!deletedBooking) {
    return res.status(404).json({ error: "Booking not found." });
  }

  res.json({ message: "Booking deleted successfully." });
};

module.exports = {
  createBooking,
  getBookings,
  deleteBooking,
};
