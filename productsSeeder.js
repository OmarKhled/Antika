import dotenv from "dotenv";
import connectDB from "./config/db.js";
import mongoose from "mongoose";
import FormData from "form-data";
import fs from "fs";
import axios from "axios";
import Product from "./models/productModel.js";
import colors from "colors";
import products from "./data/products.js";

import Categories from "./models/categoriesModel.js";

dotenv.config();
connectDB();

const exportData = async () => {
  try {
    // Deleting all products
    const dBproducts = await Product.find({});

    for (let index = 0; index < dBproducts.length; index++) {
      const product = dBproducts[index];

      await product.delete();
    }

    for (let index = 0; index < products.length; index++) {
      const product = products[index];
      for (let index = 0; index < product.img.src.length; index++) {
        const fd = new FormData();
        const img = product.img.src[index];
        const image = fs.createReadStream(`./data/${img}`);
        fd.append("image", image);
        const res = await axios.post("http://127.0.0.1:8000/api/uploads", fd, {
          headers: fd.getHeaders(),
        });
        product.img.src[
          index
        ] = `/api/uploads/images/${res.data.file.filename}`;
        // console.log(res.data.file.filename);
      }
      console.log(product.img.src);

      const categories = await Categories.find({});
      const category = categories.find(
        (category) => category.name.en === product.category.toLowerCase()
      );

      product.category = category._id;

      const dbProduct = new Product(product);

      await dbProduct.save();
    }
    console.log("Data Erxported!".green.inverse);
    // process.exit();
  } catch (err) {
    console.log(`Error: ${err}, ${err.message}`.red.inverse.bold);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Deleting all products
    const dBproducts = await Product.find({});

    for (let index = 0; index < dBproducts.length; index++) {
      const product = dBproducts[index];

      await product.delete();
    }
    // Init gfs
    let gfs;
    // Init DB Connection
    const conn = mongoose.createConnection(process.env.MONGO_URI);

    conn.once("open", async () => {
      gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads",
      });

      gfs.find({}).toArray(async (err, files) => {
        for (let index = 0; index < files.length; index++) {
          const file = files[index];
          console.log(`${file["_id"]}`.red.underline.bold);
          await gfs.delete(file["_id"], (err) => {
            if (err) throw new Error("Image delete error");
          });
        }
      });
      console.log("Data Destroyed!".red.inverse);
      // process.exit();
    });
  } catch (err) {
    console.log(`Error: ${err}, ${err.message}`.red.inverse.bold);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  exportData();
}
