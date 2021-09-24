import mongoose from "mongoose";
// import mongooseAlgolia from "mongoose-algolia";
import dotenv from "dotenv";

dotenv.config();

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  src: {
    type: Array,
    required: true,
  },
});

const simpleLanguagechema = new Schema({
  en: {
    type: String,
  },
  ar: {
    type: String,
  },
});

const specificationsSchema = new Schema({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  features: [
    {
      type: simpleLanguagechema,
    },
  ],
});

const productModel = new Schema(
  {
    img: imageSchema,
    name: simpleLanguagechema,
    description: simpleLanguagechema,
    category: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Categories",
    },
    price: {
      type: Number,
      required: true,
    },
    numberOfpurchases: {
      type: Number,
      required: true,
      default: 0,
    },
    sale: {
      type: Number,
      required: true,
      default: 0,
    },
    brand: {
      type: simpleLanguagechema,
      required: false,
    },
    specifications: {
      type: specificationsSchema,
      required: true,
    },
    inStock: {
      type: Number,
      required: true,
    },
    rating: {
      type: String,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// productModel.plugin(mongooseAlgolia, {
//   appId: process.env.ALGOLIA_APP_ID,
//   apiKey: process.env.ALGOLIA_API_KEY,
//   indexName: "antika",
//   populate: {
//     path: "category",
//   },
//   debug: true,
// });

const Product = mongoose.model("Products", productModel);

// Product.SyncToAlgolia();

export default Product;
