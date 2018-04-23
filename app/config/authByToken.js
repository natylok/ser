const SECRET = require('../constants/defaults').SECRET_DEFAULT_KEY;
const User = require('../models/user');
const jwt = require('jwt-simple');
exports.authByToken = (req, res, next) => {
    let authHeader = req.get('authorization');
    let jwtToken = jwt.decode(authHeader, SECRET);
    const user_id = jwtToken.sub;
    User.findById(user_id, function(err, user) {
        if (err) { return res.status(403).send({error:'User in not authanticate'}) }
        if (!user) { return res.status(400).send({error:'Could not find the user'})}
        req.user = user;
        next();
      });
}
