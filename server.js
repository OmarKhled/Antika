import express from "express";
import mongoose from "mongoose";
import path from "path";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

import uploadsRoutes from "./routes/uploadsRoute.js";
import productRoutes from "./routes/productRoutes.js";

import colors from "colors";

dotenv.config();

// Init gfs
let gfs;

connectDB().then(() => {
  const conn = mongoose.connection;
  // Init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  })
})

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/uploads", uploadsRoutes);
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV == "production") {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res, next) => {
    res.send("Welcome to Anteka API!");
  });
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(
    `Server is up and running in ${process.env.NODE_ENV} mode on port ${PORT}...`
      .cyan.bold
  )
);
