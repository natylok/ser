const mongoose = require('mongoose');
const MONGODB_URL = require('../constants/apis').MONGO_URL;
mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URL);
module.exports = {
    mongoose
};