import express from "express";
import Product from "../models/productModel.js";
import Categories from "../models/categoriesModel.js";

const router = express.Router();

// @route   GET    /api/products/
// @desc    Get all products in DB
// @access  Public
router.get("/", async (req, res) => {
  try {
    let products = await Product.find();

    if (products.length === 0 || !products) {
      return res.status(404).json({ msg: "No products found.." });
    }

    for (let index = 0; index < products.length; index++) {
      const product = products[index];
      const categoryId = product.category;
      const category = await Categories.findById(categoryId).select({ "createdAt": 0, "updatedAt": 0, "_v": 0 });
      
      products[index].category = category
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
    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ msg: "This product Doesn't exist" });
    }
    const categoryId = product.category;
    const category = await Categories.findById(categoryId).select({ "createdAt": 0, "updatedAt": 0, "_v": 0 });
      
    product.category = category
    res.json({ product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error 500" });
  }
});

export default router;
