const ClassService = require("../service/ClassService")

module.exports = {
 async getList(req, res){
  var result = await ClassService.getList()
  res.send(result)
  },
 async addList(req, res){
  var result = await ClassService.addList(req.body)
  res.send(result)
},
 async deleteList(req, res){
  var result = await ClassService.deleteList(req.params.id)
  res.send(result)
 }
}