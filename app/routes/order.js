const express = require('express');
const Order = require('../models/order');
const router = express.Router();
const User = require('../models/user');
const moment = require('moment'); 
const ValidatorSrv = require('../services/validatorSrv');
router.post('/',(req,res) => {
    const userUrl = req.body.userUrl;
    User.findOne({userUrl}).then((userData,err) => {
        ValidatorSrv.validateOrder(req.body,userData._id).then((results) => {
            const user_id = userData._id;
            if(err){
                res.status(400).send({reason:err});
            }
            else{
                const order = new Order({
                    user_id,
                    name:req.body.name,
                    date:req.body.date,
                    phone: req.body.phone,
                    startHour:req.body.startHour,
                    endHour:req.body.endHour
                });
                order.save().then((data,err) => {
                    if(err){
                        res.status(400).send({reason:err});
                    }
                    else{
                        res.send(data);
                    }
                })
            }
        }).catch(err => {
            res.status(400).send({reason:err});
        });


    })

});

module.exports = router;