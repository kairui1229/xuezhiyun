const ClassModel = require("../model/ClassModel");


module.exports = {
  getList(){
    return ClassModel.find()
  },
  addList(data){
    return ClassModel.findOneAndUpdate({
      title: data.title
    },{
      $set: data
    },{
      upsert: true,
      returnDocument: "after"
    }
    )
  },
  deleteList(id){
    return ClassModel.findByIdAndDelete(id)
  }
}