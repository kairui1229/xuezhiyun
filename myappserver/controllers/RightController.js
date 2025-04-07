const RightService = require("../service/RightService")

module.exports = {
 async getList(req, res){
  var result = await RightService.getList()
  res.send(result)
  },
 async updateList(req, res){
  var result = await RightService.updateList(req.body)
  res.send(result)
  },
 async deleteList(req, res){
  var result = await RightService.deleteList(req.body)
  res.send(result)
 }
}