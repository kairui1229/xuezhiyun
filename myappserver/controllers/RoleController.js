const RoleService = require("../service/RoleService")

module.exports = {
 async getList(req, res){
  var result = await RoleService.getList()
  res.send(result)
  },
 async updateList(req, res){
  var result = await RoleService.updateList(req.params.id,req.body)
  res.send(result)
  },
 async deleteList(req, res){
  var result = await RoleService.deleteList(req.params.id)
  res.send(result)
 }
}