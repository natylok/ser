const express = require('express');
const User = require('../models/user');
const axios = require('axios');
const jwtService = require('../services/jwtService');
const FACEBOOK_AUTH_URL = require('../constants/apis').FACEBOOK_AUTH_URL;
const router = express.Router();
const userGeneratorSrv = require('../services/userUrlGeneratorSrv');
router.post('/',function(req, res, next) {
    axios.get(FACEBOOK_AUTH_URL.replace('<TOKEN>',req.body.token)).then((response) => {
        const {name,email,picture} = response.data;
        const facebook_id = response.data.id;
        User.findOne({facebook_id}).then((user, err) => {
            if (err){ 
                return next(err); 
            }
            if (!user) {
                const userUrl = userGeneratorSrv.getUrl(name,email).replace(/\s/g, '');
                const user = new User({
                    facebook_id,
                    email,
                    name,
                    picture:picture.data,
                    userUrl
                });
                user.save().then((data,err) => {
                    if(err){
                        return next(err);
                    }
                   
                    res.json({
                        token: jwtService.encodeToken(user),
                        email,
                        name,
                        picture,
                        userUrl
                    });
                });
            } 
            else {
                const userUrl = userGeneratorSrv.getUrl(name,email);
                res.json({
                    token: jwtService.encodeToken(user),
                    email,
                    name,
                    picture
                });
            }
        });
    }).catch((err) => {
      return next(err);
    });
  })
module.exports = router;