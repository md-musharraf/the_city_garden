const express = require("express");
const adminAuthModel = require("../models/adminAuth.model");
const { ADMIN_TOKEN } = require("../config/admin.credentials");
const router = express.Router();

// POST /api/admin/register — create a new admin
router.post("/admin/register", async (req, res) => {
  const { phone, password } = req.body;

  const admin = new adminAuthModel({ phone, password });
  await admin.save();

  res.json({ message: "Admin created successfully" });
});

// POST /api/admin/login
router.post("/admin/login", async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: "Phone and password are required" });
  }

  try {
    const admin = await adminAuthModel.findOne({ phone });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Return the static admin token so frontend can authorize dashboard requests
    res.json({
      message: "Admin logged in successfully",
      admin,
      token: ADMIN_TOKEN,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
