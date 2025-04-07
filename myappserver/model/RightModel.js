const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RightType = {
  "title":String,
  "path":String,
  "icon":String,
  "children":Array
}
const RightModel = mongoose.model('right',new Schema(RightType));
module.exports = RightModel;