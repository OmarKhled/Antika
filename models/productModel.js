import mongoose from "mongoose";
const Schema = mongoose.Schema;

const product = {
  img: {
    src: "3.jpg",
    alt: "Telephone",
  },
  en: {
    name: "Old Telephone",
    description: "This Telephone shows the old How old phones operated",
  },
  ar: {
    name: "هاتف قديمة",
    description: "تظهر لنا هذه التحفة كيف كانت تعمل الهواتف القديمة",
  },
  price: "70",
  numberOfpurchases: 0,
  sale: 0,
};

const productModel = new Schema(
  {
    img: {
      type: Object,
      required: true,
    },
    en: {
      type: Object,
      required: true,
    },
    ar: {
      type: Object,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    numberOfpurchases: {
      type: Number,
      required: true,
    },
    sale: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Products", productModel);

export default Product;
