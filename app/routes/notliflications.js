const express = require('express');
const Order = require('../models/order');
const router = express.Router();
const User = require('../models/user');

router.post('/',(req,res) => {
    const token = req.body.token, userUrl = req.body.userUrl;
    User.findOne({userUrl})
        .then((userData,err) => {
            if(err){
                res.status(400).send({reason:err});
            }
            else{
                userData.set({notiflicationToken:req.body.token})
                userData.save().then((data,err) => {
                        console.log("success saved token in user instance");
                        res.send({message:'Token saved succesfully'});
                    });
            }
    })

});

module.exports = router;