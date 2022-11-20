import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import config from "config";
import db from "../config/db";

const app = express();
app.use(express.json());

app.use(cors());

// Routes
import userRouter from "./routes/userRouter";
import transactionRouter from "./routes/transactionRouter";

app.use("/user/", userRouter);
app.use("/transaction/", transactionRouter);

const port = config.get<number>("port");
app.listen(port, async () => {
  await db();
  console.log(`Server is running on port ${port}.`);
});
