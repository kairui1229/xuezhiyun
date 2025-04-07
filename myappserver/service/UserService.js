const UserModel = require("../model/UserModel");

module.exports = {
  getList(){
    return UserModel.find().populate("role");
  },
  login(data){
    return UserModel.find(data).populate("role");
  },
  addList(data){
    return UserModel.create(data);
  },
  updateList(id,data){
    return UserModel.findByIdAndUpdate(id,data)
  },
  deleteList(id){
    return UserModel.findByIdAndDelete(id)
  }
}