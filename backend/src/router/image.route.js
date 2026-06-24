const express = require("express");
const router = express.Router();
const Image = require("../models/image.model");
const multer = require("multer");
const uploadImage = require("../services/image.service");
const verifyAdmin = require("../middleware/adminAuth");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload/image", verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const response = await uploadImage(req.file.buffer, req.file.originalname);

    const newImage = new Image({ event: req.body.event, image: response.url, mediaType: "image" });
    await newImage.save();
    res.status(201).json({ message: "Image saved successfully" });
  } catch (error) {
    console.error("Image upload error:", error.message, error.stack);
    res.status(500).json({ message: error.message || "Error saving data" });
  }
});

router.post("/upload/video", verifyAdmin, upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!req.file.mimetype?.startsWith("video/")) {
      return res.status(400).json({ message: "Only video files are allowed" });
    }

    const response = await uploadImage(req.file.buffer, req.file.originalname);

    const newVideo = new Image({ event: req.body.event, image: response.url, mediaType: "video" });
    await newVideo.save();
    res.status(201).json({ message: "Video saved successfully" });
  } catch (error) {
    console.error("Video upload error:", error.message, error.stack);
    res.status(500).json({ message: error.message || "Error saving data" });
  }
});

// GET /api/images?limit=9&skip=0
router.get("/images", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "9", 10);
    const skip = parseInt(req.query.skip || "0", 10);
    const images = await Image.find().sort({ _id: -1 }).skip(skip).limit(limit);
    const total = await Image.countDocuments();
    res.json({ images, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch images" });
  }
});

// DELETE /api/images/:id
router.delete("/images/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedImage = await Image.findByIdAndDelete(id);
    if (!deletedImage) {
      return res.status(404).json({ message: "Media not found" });
    }
    res.json({ message: "Media deleted successfully from gallery" });
  } catch (err) {
    console.error("Delete media error:", err);
    res.status(500).json({ message: err.message || "Failed to delete media" });
  }
});

module.exports = router;

