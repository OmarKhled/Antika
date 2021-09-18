import express from "express";
import upload from "../middlewares/uploads.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import colors from "colors";

dotenv.config();

const router = express.Router();

// Init gfs
let gfs;
// Init DB Connection
const conn = mongoose.createConnection(process.env.MONGO_URI);

conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
});

// @route  POST   /api/uploads
// @desc   Upload file to db
// @access Public
router.post("/", upload.single("image"), (req, res, next) => {
  if (!req.file) {
    console.log("No files are sent".red.bold);
  }
  res.json({ file: req.file });
});

// @route   GET    /api/uploads/images
// @desc    Get image from db
// @access  Public
router.get("/images/:filename", (req, res) => {
  gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    const file = files[0];
    const contentType = file.contentType;

    if (
      contentType === "image/jpeg" ||
      contentType === "image/png" ||
      contentType === "image/jpg"
    ) {
      const { _id } = file;
      const readstream = gfs.openDownloadStream(_id);
      readstream.pipe(res);
    } else {
      res.status(401).json({ msg: "File isn't a photo" });
    }
  });
});
export default router;
