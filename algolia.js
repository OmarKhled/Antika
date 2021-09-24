import algoliasearch from "algoliasearch";
import connectDB from "./config/db.js";
import Product from "./models/productModel.js";
import Categories from "./models/categoriesModel.js";

import dotenv from "dotenv";

dotenv.config();

const client = algoliasearch("4U2K1RD3DN", "225720254d72fb7b53383ce7654ff091");

const index = client.initIndex("antika");

connectDB().then(async () => {
  let products = await Product.find({});

  for (let index = 0; index < products.length; index++) {
    const product = products[index];
    const categoryId = product.category;
    const category = await Categories.findById(categoryId).select({
      createdAt: 0,
      updatedAt: 0,
      _v: 0,
    });

    products[index].category = category;
  }

  index
    .saveObjects(products, { autoGenerateObjectIDIfNotExist: true })
    .then(() => {
      console.log("success");
      process.exit();
    });
});
