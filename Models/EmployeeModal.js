const mongoose = require("mongoose");

const schema = mongoose.Schema;

const EmployeeScheme = new schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  profileImage: { type: String },
  salary: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

const EmployeeModel = mongoose.model("employee", EmployeeScheme);

module.exports = EmployeeModel;
