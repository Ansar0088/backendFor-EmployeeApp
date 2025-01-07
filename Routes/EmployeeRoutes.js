const express = require('express'); 
const { createEmployee, getAllEmployees, deleteEmployee, updateEmployeeById ,GetEmployeeById} = require('../Controllers/Employee'); 
const { cloudinaryFileUploader } = require('../MiddleWare/fileUploader'); 

const routes = express.Router();
routes.get('/:id', GetEmployeeById);
routes.get('/', getAllEmployees);
routes.delete('/:id',deleteEmployee);
routes.put('/:id',cloudinaryFileUploader.single('profileImage'),updateEmployeeById)

routes.post('/', cloudinaryFileUploader.single('profileImage'), createEmployee);

module.exports = routes;
