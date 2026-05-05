const mongoose = require("mongoose");

const adminAuthSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const adminModel = mongoose.model("admin", adminAuthSchema);

module.exports = adminModel;
