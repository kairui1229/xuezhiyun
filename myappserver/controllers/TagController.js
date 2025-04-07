const TagService = require("../service/TagService")

module.exports = {
 async getList(req, res){
  var result = await TagService.getList()
  res.send(result)
  },
 async addList(req, res){
  var result = await TagService.addList(req.body)
  res.send(result)
},
 async updateList(req, res){
  var result = await TagService.updateList(req.params.id,req.body)
  res.send(result)
  },
 async deleteList(req, res){
  var result = await TagService.deleteList(req.params.id)
  res.send(result)
 }
}