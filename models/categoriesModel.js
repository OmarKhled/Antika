import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categoriesModel = new Schema(
  {
    name: {
      type: new Schema({
        en: {
          type: String,
          required: true
        },
        ar: {
          type: String,
          required: true
        }
      })
      , required: true
    }
  },
  {
    timestamps: true,
  }
);

const Categories = mongoose.model("Categories", categoriesModel);

export default Categories;
