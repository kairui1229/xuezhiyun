const { updataList } = require("../controllers/StudentController");
const StudentModel = require("../model/StudentModel");

module.exports = {
  getList(){
    return StudentModel.find().populate("class");
  },
  async addList(data){
    const list = data.list.map(item => ({
      studentname: item.studentname,
      class: data.class,
      score:{}
    }))
    for(let i of list){
      await StudentModel.updateOne({
        studentname: i.studentname,
      },{
        $set:i
      },{
        upsert: true
      })
    }
    return []
  },
  updateList(id,{key,value}){
    return StudentModel.findByIdAndUpdate(id,{
      $set:{
        ["score."+key]:value
      }
    }
    )
  },
  deleteList(id){
    return StudentModel.deleteMany({
      class: id
    })
  }
}