const express = require("express");
const router = express.Router();
const Booking = require("../models/booking.model");
const verifyAdmin = require("../middleware/adminAuth");

const normalizeDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
};

router.post("/book", async (req, res) => {
  console.log("Booking request body:", req.body);

  try {
    const { name, phone, event, date, guests, message, stayRoom } = req.body;

    if (!name || !phone || !event || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Convert phone to number
    const phoneNum = parseInt(phone, 10);
    if (isNaN(phoneNum)) {
      return res.status(400).json({ message: "Phone must be a valid number" });
    }

    const normalizedDate = normalizeDate(date);
    if (!normalizedDate) {
      return res.status(400).json({ message: "Invalid date" });
    }

    // Check if date already booked
    const existing = await Booking.findOne({ eventDate: normalizedDate });
    if (existing) {
      return res.status(400).json({ message: "Date already booked" });
    }

    const booking = await Booking.create({
      name,
      phone: phoneNum,
      event,
      eventDate: normalizedDate,
      stayRoom: stayRoom || "Not required",
    });

    res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    console.error("Booking error:", err.message, err.stack);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Date already booked" });
    }
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});

// Return all booked dates (ISO strings)
router.get("/booked", async (req, res) => {
  try {
    const bookings = await Booking.find({ eventDate: { $ne: null } })
      .select("eventDate event -_id")
      .sort({ eventDate: 1 });

    const dates = bookings
      .filter((b) => b.eventDate instanceof Date && !Number.isNaN(b.eventDate.getTime()))
      .map((b) => ({ date: b.eventDate.toISOString(), event: b.event }));

    res.json({ dates });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// Admin: mark a date as booked (offline booking by owner)
router.post("/admin/book-offline", verifyAdmin, async (req, res) => {
  try {
    const { date, event, name } = req.body;
    if (!date || !event) return res.status(400).json({ message: "date and event required" });

    const normalizedDate = normalizeDate(date);
    if (!normalizedDate) return res.status(400).json({ message: "Invalid date" });

    const existing = await Booking.findOne({ eventDate: normalizedDate });
    if (existing) return res.status(400).json({ message: "Date already booked" });

    const booking = await Booking.create({
      name: name || "Owner",
      phone: 0,
      event,
      eventDate: normalizedDate,
    });

    res.status(201).json({ message: "Offline booking created", booking });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Date already booked" });
    }
    res.status(500).json({ message: "Failed to create offline booking" });
  }
});

// Admin: delete/unbook a date
router.delete("/admin/unbook/:date", verifyAdmin, async (req, res) => {
  try {
    const { date } = req.params;
    const normalizedDate = normalizeDate(date);
    if (!normalizedDate) return res.status(400).json({ message: "Invalid date" });

    const booking = await Booking.findOneAndDelete({ eventDate: normalizedDate });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Date unbooked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to unbook date" });
  }
});

module.exports = router;
