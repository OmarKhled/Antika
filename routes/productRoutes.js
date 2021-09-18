import express from "express";
import Product from "../models/productModel.js";

const router = express.Router();

// @route   GET    /api/products/
// @desc    Get all products in DB
// @access  Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length === 0 || !products) {
      return res.status(404).json({ msg: "No products found.." });
    }
    res.json({ products });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error 500" });
  }
});

// @route   GET    /api/products/:id
// @desc    Get single product from DB
// @access  Public
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ msg: "This product Doesn't exist" });
    }
    res.json({ product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error 500" });
  }
});

export default router;
