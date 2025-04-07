var express = require('express');
var CompanyController = require('../controllers/CompanyController');
var CompanyRouter = express.Router();

CompanyRouter.get("/adminapi/companys",CompanyController.getList)
CompanyRouter.post("/adminapi/companys",CompanyController.addList)
CompanyRouter.put("/adminapi/companys/:id",CompanyController.updateList)
module.exports = CompanyRouter;