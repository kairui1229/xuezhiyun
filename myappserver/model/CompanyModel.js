const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanyType = {
  "title":String,
  "interview":String
}
const CompanyModel = mongoose.model('company',new Schema(CompanyType));
module.exports = CompanyModel;