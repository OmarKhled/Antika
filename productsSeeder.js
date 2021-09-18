import dotenv from "dotenv";
import connectDB from "./config/db.js";
import mongoose from "mongoose";
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
        src: ["1.jpg", "4.jpg"],
        alt: "Old World Glope",
      },
      en: {
        name: "Old World Glope",
        description:
          "This Antiques shows the map of thw world before the conyinats have moved",
        category: "Decor",
      },
      ar: {
        name: "كرة أرضية قديمة",
        description: "هذه التحفة تظهر خريطة العالم قبل ان تتحرك القارات",
        category: "ديكور",
      },
      price: "40",
      inStock: 30,
    },
    {
      img: {
        src: ["2.jpg"],
        alt: "Vase",
        category: "Decor",
      },
      en: {
        name: "Old Vase",
        description: "This Vase Belonged to the king Luis the 7th",
        category: "Decor",
      },
      ar: {
        name: "مزهرية قديمة",
        description: "كانت هذه المزهرية ملكا للملك لويس السابع",
        category: "ديكور",
      },
      price: "80",
      inStock: 0,
    },
    {
      img: {
        src: ["3.jpg"],
        alt: "Telephone",
      },
      en: {
        name: "Old Telephone",
        description: "This Telephone shows How old phones operated",
        category: "Decor",
      },
      ar: {
        name: "هاتف قديم",
        description: "تظهر لنا هذه التحفة كيف كانت تعمل الهواتف القديمة",
        category: "ديكور",
      },
      price: "70",
      inStock: 3,
    },
  ];
  try {
    // Deleting all products
    await Product.deleteMany();
    for (let index = 0; index < products.length; index++) {
      const product = products[index];
      for (let index = 0; index < product.img.src.length; index++) {
        const fd = new FormData();
        const img = product.img.src[index];
        const image = fs.createReadStream(`./data/${img}`);
        fd.append("image", image);
        const res = await axios.post("http://127.0.0.1:8000/api/uploads", fd, {
          headers: fd.getHeaders(),
        });
        product.img.src[
          index
        ] = `/api/uploads/images/${res.data.file.filename}`;
        // console.log(res.data.file.filename);
      }
      console.log(product.img.src);
      const dbProduct = new Product(product);

      await dbProduct.save();
    }
    console.log("Data Erxported!".green.inverse);
    process.exit();
  } catch (err) {
    console.log(`Error: ${err}, ${err.message}`.red.inverse.bold);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Deleting all products
    await Product.deleteMany();
    // Init gfs
    let gfs;
    // Init DB Connection
    const conn = mongoose.createConnection(process.env.MONGO_URI);

    conn.once("open", async () => {
      gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads",
      });

      gfs.find({}).toArray(async (err, files) => {
        for (let index = 0; index < files.length; index++) {
          const file = files[index];
          console.log(`${file["_id"]}`.red.underline.bold);
          await gfs.delete(file["_id"], (err) => {
            if (err) throw new Error("Image delete error");
          });
        }
      });
      // console.log("Data Destroyed!".red.inverse);
      // process.exit();
    });
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
