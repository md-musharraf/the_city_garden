const express = require("express");
const imageRouter = require("./router/image.route");
const bookingRouter = require("./router/booking.route");
const adminRouter = require("./router/adminAuth.route");
const app = express();
const cors = require("cors");

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, server-to-server)
      if (!origin) return callback(null, true);

      const allowed = ["https://the-city-garden.vercel.app"];

      // Allow any Vercel preview URL for this project
      const isVercelPreview =
        /^https:\/\/the-city-garden.*\.vercel\.app$/.test(origin);
      // Allow localhost on any port for local dev
      const isLocalhost = /^http:\/\/localhost:\d+$/.test(origin);
      const isLocalIP = /^http:\/\/10\.\d+\.\d+\.\d+:\d+$/.test(origin);

      if (
        allowed.includes(origin) ||
        isVercelPreview ||
        isLocalhost ||
        isLocalIP
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
  }),
);

// Middleware to parse JSON bodies
app.use(express.json());

// Health check — keeps Render awake & lets you verify the backend is running
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api", imageRouter);
app.use("/api", bookingRouter);
app.use("/api", adminRouter);

module.exports = app;

