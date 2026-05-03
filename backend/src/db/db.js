const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");

    // Clean up old indices and recreate correct ones
    const Booking = require("../models/booking.model");
    const BookingCollection = Booking.collection;

    // Get all indices
    const indices = await BookingCollection.getIndexes();
    console.log("Current indices:", Object.keys(indices));

    // Drop old "date_1" index if it exists
    if (indices.date_1) {
      await BookingCollection.dropIndex("date_1");
      console.log("Dropped old date_1 index");
    }

    // Drop old "eventDate_1" index if it exists to recreate it
    if (indices.eventDate_1) {
      await BookingCollection.dropIndex("eventDate_1");
      console.log("Dropped existing eventDate_1 index");
    }

    // Recreate the correct unique index
    await BookingCollection.createIndex({ eventDate: 1 }, { unique: true });
    console.log("Created unique index on eventDate");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
