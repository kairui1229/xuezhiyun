const UserService = require("../service/UserService")
const JWT = require("../util/JWT")

module.exports = {
 async getList(req, res){
  var result = await UserService.getList()
  res.send(result)
  },
  async login(req, res) {
    var result = await UserService.login(req.body)
    if (result.length) {
        let { _id, username, role } = result[0]
        
        const token  =JWT.generate({
            _id,
            username
        },"12h")
        res.header("Authorization",token)

        res.send({
            ActionType: "OK",
            data: { _id, username, role }
        })
    } else {
        res.status(400).send({
            ActionType: "fail"
        })
    }
},
 async addList(req, res){
  var result = await UserService.addList(req.body)
  res.send(result)
},
 async updateList(req, res){
  var result = await UserService.updateList(req.params.id,req.body)
  res.send(result)
  },
 async deleteList(req, res){
  var result = await UserService.deleteList(req.params.id)
  res.send(result)
 }
}