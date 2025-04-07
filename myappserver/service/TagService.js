const TagModel = require("../model/TagModel");

module.exports = {
  getList(){
    return TagModel.find().sort({grade: 1});//按等级排序
  },
  addList(data){
    return TagModel.create(data);
  },
  updateList(id,data){
    return TagModel.findByIdAndUpdate(id,data)
  },
  deleteList(id){
    return TagModel.findByIdAndDelete(id)
  }
}