var express = require('express');
const CompanyStudentController = require('../controllers/CompanyStudentController');

var CompanyStudentRouter = express.Router();

CompanyStudentRouter.get("/adminapi/companystudents",CompanyStudentController.getList)
CompanyStudentRouter.post("/adminapi/companystudents",CompanyStudentController.addList)
// CompanyStudentRouter.put("/adminapi/companystudents/:id",CompanyStudentController.updateList)
module.exports = CompanyStudentRouter;