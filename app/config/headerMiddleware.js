const DEFAULT_PORT = require('../constants/defaults').DEFAULT_PORT;
module.exports = function(app){
    app.use(function (req, res, next) {  
        res.setHeader('Access-Control-Allow-Origin', `http://localhost:${DEFAULT_PORT}`);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
}