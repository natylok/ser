var mongoose = require('mongoose');

var scheduleSchema = new mongoose.Schema({
    user_id: {
      type: String,
      required: true
    },
    times: {
      type: Object,
      required: true
    },
    duration: {
      type: Number,
      required:true
    }
  });

module.exports = mongoose.model('schedule', scheduleSchema);