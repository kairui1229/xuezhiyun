const StudentService = require("../service/StudentService")

module.exports = {
 async getList(req, res){
  var result = await StudentService.getList()
  res.send(result)
  },
 async addList(req, res){
  var result = await StudentService.addList(req.body)
  res.send(result)
},
async updateList(req, res){
  var result = await StudentService.updateList(req.params.id,req.body)
  res.send(result)
},
 async deleteList(req, res){
  var result = await StudentService.deleteList(req.params.id)
  res.send(result)
 }
}