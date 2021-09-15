import express from "express";
import colors from "colors";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV == "production") {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    console.log(path.resolve(__dirname, "client", "build", "index.html"));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(
    `Server is up and running in ${process.env.NODE_ENV} mode on port ${PORT}...`
      .cyan.bold
  )
);
