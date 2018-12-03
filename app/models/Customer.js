
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let customerSchema = new Schema({
  accountNumber: {
    type: String,
    unique:true,
  },
  ifscCode: {
    type: String
  },
  name: {
    type: String,
    default: ''
  },
  accountType: {
      type: String
  },
  email: {
    type: String,
    default: ''
  },
  mobileNumber: {
    type: Number,
    default: 0
  },
  address: {
      type: String
  },
  createdOn :{
    type:Date,
    default:""
  }


})

mongoose.model('Customer', customerSchema);
