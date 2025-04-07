const CompanyStudentService = require("../service/CompanyStudentService")

module.exports = {
 async getList(req, res){
  var result = await CompanyStudentService.getList()
  res.send(result)
  },
 async addList(req, res){
  var result = await CompanyStudentService.addList(req.body)
  res.send(result)
  },
//  async updateList(req,res){
//   var result = await CompanyStudentService.updateList(req.params.id,req.body)
//   res.send(result)
//  } 
}