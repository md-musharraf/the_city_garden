const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  event: { type: String, required: true },
  image: { type: String, required: true },
  mediaType: { type: String, enum: ["image", "video"], default: "image" },
});

module.exports = mongoose.model("Image", imageSchema);
