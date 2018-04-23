const jwt = require('jwt-simple'),
    SECRET_DEFAULT_KEY = require('../constants/defaults').SECRET_DEFAULT_KEY;
module.exports = {
    encodeToken: (user) => {
        const tempJwtObj = {
            sub: user._id,
            iat: new Date().getTime()
        };
        return jwt.encode(tempJwtObj, SECRET_DEFAULT_KEY); 
    }
}