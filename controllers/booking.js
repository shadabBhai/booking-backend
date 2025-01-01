const fs = require("fs");
const path = require("path");

// Path to the bookings JSON file
const filePath = path.join(__dirname, "../data/bookings.json");

// Helper function to read bookings from the JSON file
const readBookingsFromFile = () => {
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (err) {
    return []; // If file doesn't exist, return an empty array
  }
};

// Helper function to write bookings to the JSON file
const writeBookingsToFile = (bookings) => {
  fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2));
};

// Create a booking
const createBooking = (req, res) => {
  const { name, date, time } = req.body;

  if (!name || !date || !time) {
    return res
      .status(400)
      .json({ error: "Name, date, and time are required." });
  }

  const bookings = readBookingsFromFile();

  // Find the next booking ID
  const bookingId = bookings.length ? bookings[bookings.length - 1].id + 1 : 1;

  const newBooking = {
    id: bookingId,
    name,
    date,
    time,
  };

  bookings.push(newBooking);

  // Write updated bookings to file
  writeBookingsToFile(bookings);

  res
    .status(201)
    .json({ message: "Booking created successfully.", booking: newBooking });
};

// Get all bookings
const getBookings = (req, res) => {
  const bookings = readBookingsFromFile();
  res.json(bookings);
};

// Delete a booking
const deleteBooking = (req, res) => {
  const { id } = req.params;

  const bookings = readBookingsFromFile();

  const bookingIndex = bookings.findIndex(
    (booking) => booking.id === parseInt(id)
  );

  if (bookingIndex === -1) {
    return res.status(404).json({ error: "Booking not found." });
  }

  bookings.splice(bookingIndex, 1);

  // Write updated bookings to file
  writeBookingsToFile(bookings);

  res.json({ message: "Booking deleted successfully." });
};

module.exports = {
  createBooking,
  getBookings,
  deleteBooking,
};
