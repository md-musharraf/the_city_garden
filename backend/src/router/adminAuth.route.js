const express = require("express");
const { ADMIN_PHONE, ADMIN_PASSWORD, ADMIN_TOKEN } = require("../config/admin.credentials");

const router = express.Router();

router.post("/admin/login", (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: "phone and password required" });
  }

  if (phone !== ADMIN_PHONE || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.json({
    message: "Login successful",
    token: ADMIN_TOKEN,
  });
});

router.post("/admin/verify", (req, res) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.json({ message: "Authorized" });
});

module.exports = router;
