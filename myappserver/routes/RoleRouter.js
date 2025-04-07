var express = require('express');
var RoleController = require('../controllers/RoleController');
var RoleRouter = express.Router();

RoleRouter.get("/adminapi/roles",RoleController.getList)
RoleRouter.put("/adminapi/roles/:id",RoleController.updateList)
RoleRouter.delete("/adminapi/roles/:id",RoleController.deleteList)
module.exports = RoleRouter;