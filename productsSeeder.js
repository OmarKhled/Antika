import dotenv from "dotenv";
import connectDB from "./config/db.js";
import FormData from "form-data";
import fs from "fs";
import axios from "axios";
import Product from "./models/productModel.js";
import colors from "colors";

dotenv.config();
connectDB();

const exportData = async () => {
  const products = [
    {
      img: {
        src: "1.jpg",
        alt: "Old World Glope",
      },
      en: {
        name: "Old World Glope",
        description:
          "This Antiques shows the map of thw world before the conyinats have moved",
      },
      ar: {
        name: "كرة أرضية قديمة",
        description: "هذه التحفة تظهر خريطة العالم قبل ان تتحرك القارات",
      },
      price: "40",
      numberOfpurchases: 0,
      sale: 0,
    },
    {
      img: {
        src: "2.jpg",
        alt: "Vase",
      },
      en: {
        name: "Old Vase",
        description: "This Vase Belonged to the king Luis the 7th",
      },
      ar: {
        name: "مزهرية قديمة",
        description: "كانت هذه المزهرية ملكا للملك لويس السابع",
      },
      price: "80",
      numberOfpurchases: 0,
      sale: 0,
    },
    {
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
    },
  ];
  try {
    await Product.deleteMany();
    for (let index = 0; index < products.length; index++) {
      const product = products[index];
      const fd = new FormData();
      const image = fs.createReadStream(`./data/${product.img.src}`);
      fd.append("image", image);
      const res = await axios.post("http://127.0.0.1:8000/api/uploads", fd, {
        headers: fd.getHeaders(),
      });
      product.img.src = `/api/uploads/images/${res.data.file.filename}`;
      console.log(res.data.file.filename);

      const dbProduct = new Product(product);

      await dbProduct.save();
    }
    console.log("Data Exported!".green.inverse);
    process.exit();
  } catch (err) {
    console.log(`Error: ${err}, ${err.message}`.red.inverse.bold);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await News.deleteMany();
    await Events.deleteMany();
    await Members.deleteMany();

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
