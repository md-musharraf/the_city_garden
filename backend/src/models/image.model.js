const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  event: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Image", imageSchema);
