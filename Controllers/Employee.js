const EmployeeModel = require("../Models/EmployeeModal");

// post Api
const createEmployee = async (req, res) => {
  try {
    const body = req.body;
    body.profileImage = req.file ? req.file?.path : null;
    console.log(body);
    const emp = new EmployeeModel(body);
    await emp.save();
    res.status(201).json({
      message: "Employee created right now",
      success: true,
      name: req.body,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};

const GetEmployeeById = async (req,res) => {
  try {
    const employeeId = req.params.id;
    const employee = await EmployeeModel.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
// Get All Employees Api
const getAllEmployees = async (req, res) => {
  try {
    let { page, limit, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const skip = (page - 1) * limit;
    // Exapmple
    // page = 1 =>(1-1)*5= 0  skip
    // page = 2 =>(2-1)*5= 5  skip
    // page = 3 =>(3-1)*5= 10 skip
    // page = 4 =>(4-1)*5= 15 skip

    // search query when user search any employee
    let searchCriteria = {};
    if (search) {
      searchCriteria = {
        name: {
          $regex: search,
          $options: "i", // case sensitive
        },
      };
    }
    // Manage Total Employees

    const countTotalEmployees = await EmployeeModel.countDocuments(
      searchCriteria
    );

    const emps = await EmployeeModel.find(searchCriteria)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });
    const totalPages = Math.ceil(countTotalEmployees / limit);
    console.log("------", emps);
    res.status(200).json({
      message: "All Employees",
      success: true,
      data: {
        employees: emps,
        pagination: {
          currentPage: page,
          countTotalEmployees,
          totalPages,
          pageSize: limit,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: {
        message: err.message || "Unknown error occurred",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        name: err.name || "Error",
      },
    });
  }
};

// Delete Api
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await EmployeeModel.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Employee deleted successfully",
      success: true,
      data: deletedEmployee,
    });
    console.log(deletedEmployee);
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      err: err,
    });
  }
};

//  Update Api
const updateEmployeeById = async (req, res) => {
  try {
    const { name, phone, email, salary, department } = req.body;

    const { id } = req.params;
    let updatedData = {
      name,
      phone,
      email,
      salary,
      department,
      updatedAt: new Date(),
    };
    if (req.file) {
      updatedData.profileImage = req.file.path;
    }

    const updateEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    if (!updateEmployee) {
      return res.status(400).json({ message: "Employee not found" });
    }
    res.status(200).json({
      message: "Employee updated",
      success: true,
      data: updateEmployee,
    });
    console.log("----", updateEmployee);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};

module.exports = {
  GetEmployeeById,
  createEmployee,
  getAllEmployees,
  deleteEmployee,
  updateEmployeeById,
};
