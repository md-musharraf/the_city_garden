const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  event: { type: String, required: true },
  eventDate: { type: Date, required: true, unique: true },
  stayRoom: { type: String, default: "Not required" },
});

module.exports = mongoose.model("Booking", bookingSchema);
