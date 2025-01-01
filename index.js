const express = require("express");
const bodyParser = require("body-parser");
const bookingRoutes = require("./routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || LOCAL_PORT;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/bookings", bookingRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});