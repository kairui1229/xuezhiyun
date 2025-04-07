var express = require('express');
var TagController = require('../controllers/TagController');
var TagRouter = express.Router();

TagRouter.get("/adminapi/tags",TagController.getList)
TagRouter.post("/adminapi/tags",TagController.addList)
TagRouter.put("/adminapi/tags/:id",TagController.updateList)
TagRouter.delete("/adminapi/tags/:id",TagController.deleteList)
module.exports = TagRouter;