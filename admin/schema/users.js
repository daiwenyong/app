const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name:String,
  password:String,
  shopcar:{ //[{id:1,num:10},{id:2,num:20}]
    type:Array,
    default:[]
  }
})
module.exports = mongoose.model('users',userSchema)
