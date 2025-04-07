const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserType = {
  "username":String,
  "password":String,
  "role":{type:Schema.Types.ObjectId,ref:'role'},
  "default":Boolean
}
const UserModel = mongoose.model('user',new Schema(UserType));
module.exports = UserModel;