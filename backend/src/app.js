const express = require("express");
const imageRouter = require("./router/image.route");
const bookingRouter = require("./router/booking.route");
const adminRouter = require("./router/adminAuth.route");
const app = express();
const cors = require("cors");

app.use(
  cors({
    credentials: true,
    origin: ["http://10.136.153.47:5173", "http://localhost:5173"],
  }),
);
// const multer = require("multer");

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/api", imageRouter);
app.use("/api", bookingRouter);
app.use("/api", adminRouter);
// app.use(multer());

module.exports = app;
