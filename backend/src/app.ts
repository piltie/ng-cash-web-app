import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import config from "config";

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api", (req, res) => {
  res.json({ message: "testando proxy" });
});

const port = config.get<number>("port");
app.listen(port, async () => {
  console.log(`Listening on port ${port}.`);
});
