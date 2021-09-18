import mongoose from "mongoose";
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  src: {
    type: Array,
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
});

const simpleLanguagechema = new Schema({
  en: {
    type: String,
  },
  ar: {
    type: String,
  },
})

const specificationsSchema = new Schema({
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  brand: { 
    type: simpleLanguagechema
  },
  features: [
    {
      type: simpleLanguagechema
    }
  ]
});

const productModel = new Schema(
  {
    img: imageSchema,
    en: languageSchema,
    ar: languageSchema,
    category: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Categories"
    },
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
    specifications: {
      type: specificationsSchema,
      required: true
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
