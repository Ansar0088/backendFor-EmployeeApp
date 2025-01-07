const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("DB is connected successfully Ansar");
  })
  .catch((err) => {
    console.log("DB connection is fail Ansar", err);
  });
