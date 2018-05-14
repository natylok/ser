var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    phone:{
        required:true,
        type:String
    },
    date:{
        required:true,
        type:String
    },
    user_id:{
        required:true,
        type:String
    },
    startHour:{
        required:true,
        type:String
    },
    endHour:{
        required:true,
        type:String
    },
});


module.exports = mongoose.model('order', orderSchema);