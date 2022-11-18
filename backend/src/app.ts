import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import config from "config";
import db from "../config/db";

const app = express();
app.use(express.json());

app.use(cors());

import router from "./router";
app.use("/api/", router);

const port = config.get<number>("port");
app.listen(port, async () => {
  await db();
  console.log(`Server is running on port ${port}.`);
});
