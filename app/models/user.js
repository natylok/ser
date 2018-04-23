var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  facebook_id: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  picture:{
      type:Object,
      required:true
  },
  userUrl:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model('user', userSchema);