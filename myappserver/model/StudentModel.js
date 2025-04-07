const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentType = {
  "studentname":String,
  "class":{type:Schema.Types.ObjectId,ref:'class'},
  "score":Object,
}
const StudentModel = mongoose.model('student',new Schema(StudentType,{minimize: false}));
module.exports = StudentModel;