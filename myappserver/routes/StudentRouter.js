var express = require('express');
var StudentController = require('../controllers/StudentController');
var StudentRouter = express.Router();

StudentRouter.get("/adminapi/students",StudentController.getList)
StudentRouter.post("/adminapi/students",StudentController.addList)
StudentRouter.put("/adminapi/students/:id",StudentController.updateList)
StudentRouter.delete("/adminapi/students/:id",StudentController.deleteList)
module.exports = StudentRouter;