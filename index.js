const express = require("express");
const app = express();
const bodyparser = require("body-parser");
require("dotenv").config();
const cors = require('cors');

const PORT = process.env.PORT;
const EmployeeRouter = require("./Routes/EmployeeRoutes");
require("./Models/db");
 
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(bodyparser.json());


app.use("/api/employees", EmployeeRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} Ansar`);
});
