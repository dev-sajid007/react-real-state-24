import express from "express";
import dotenv from "dotenv";
import conenctDB from "./config/database.js";
dotenv.config();

//app config
const app = express();
const port = 4000;

//db connection
conenctDB();

app.listen(port, () => {
  console.log(`Server is running on port:${port}...`);
});
