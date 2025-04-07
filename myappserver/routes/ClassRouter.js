var express = require('express');
var ClassController = require('../controllers/ClassController');
var ClassRouter = express.Router();

ClassRouter.get("/adminapi/classes",ClassController.getList)
ClassRouter.post("/adminapi/classes",ClassController.addList)
// ClassRouter.put("/adminapi/classes/:id",ClassController.updateList)
ClassRouter.delete("/adminapi/classes/:id",ClassController.deleteList)
module.exports = ClassRouter;