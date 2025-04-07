const CompanyService = require("../service/CompanyService")

module.exports = {
 async getList(req, res){
  var result = await CompanyService.getList()
  res.send(result)
  },
 async addList(req, res){
  var result = await CompanyService.addList(req.body)
  res.send(result)
  },
 async updateList(req, res){
    var result = await CompanyService.updateList(req.params.id,req.body)
    res.send(result)
 }
}