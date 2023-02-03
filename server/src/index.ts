import express from "express";
import db from "mongoose";
import adminRouter from "./routes/admin";
import { json, urlencoded } from "body-parser";

const port = 5000;

const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

app.use("/api", adminRouter);

db.set("strictQuery", true);
db.connect(
  "mongodb+srv://Mykola:11october@cluster0.fk1ls.mongodb.net/?retryWrites=true&w=majority",
  () => {
    console.log("Database connected succesfull");
  }
);

app.listen(port);
