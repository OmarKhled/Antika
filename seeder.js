import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

import connectDB from "./config/db.js";

import Categories from "./models/categoriesModel.js"

import categories from "./data/categories.js";

dotenv.config();
connectDB();

const exportData = async () => {
  try {
    await Categories.deleteMany();

    await Categories.insertMany(categories);

    console.log("Data Exported!".green.inverse);
    process.exit();
  } catch (err) {
    console.log(`Error: ${err}, ${err.message}`.red.inverse.bold);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    console.log("Data Destroyed!".red.inverse);
    process.exit();
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
