import mongoose from "mongoose";
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  src: {
    type: Array,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});
const languageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const productModel = new Schema(
  {
    img: imageSchema,
    en: languageSchema,
    ar: languageSchema,
    price: {
      type: String,
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

const Product = mongoose.model("Products", productModel);

export default Product;
