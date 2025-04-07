var express = require('express');
var UserController = require('../controllers/UserController');
var UserRouter = express.Router();

UserRouter.get("/adminapi/users",UserController.getList)
UserRouter.post("/adminapi/users/login",UserController.login)
UserRouter.post("/adminapi/users",UserController.addList)
UserRouter.put("/adminapi/users/:id",UserController.updateList)
UserRouter.delete("/adminapi/users/:id",UserController.deleteList)
module.exports = UserRouter;