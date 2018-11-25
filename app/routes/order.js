const express = require('express');
const Order = require('../models/order');
const router = express.Router();
const User = require('../models/user');
const moment = require('moment'); 
const Expo = require('expo-server-sdk');
const ValidatorSrv = require('../services/validatorSrv');

let expo = new Expo();

router.get('/',(req,res) => {
    const {userUrl,date} = req.body;
    user.findOne({userUrl}).then((userData,err) => {
        let searchObj = {user_id:userData.id};
        if(err){
            res.status(400).send({error:'Could not find user'});
        }
        else{
            if(date){
                searchObj = Object.assign(searchObj,{date});
            }
            Order.find(searchObj).then((orders,err) => {
                if(err){
                    res.status(400).send({error:'Could not load orders'});
                }
                else{
                    res.send({orders});
                }
            });
        }
    });
});

router.delete('/:orderId',(req,res) => {
        Order.findByIdAndDelete(req.params.orderId).then(data => {
            res.send('Order deleted successfully');
        });
});

router.put('/:orderId',(req,res) => {
    const userUrl = req.body.userUrl;
    User.findOne({userUrl}).then((userData,err) => {
        Order.findById(req.params.orderId).then(order => {
            
            order.name = req.body.name;
            order.phone = req.body.phone;

            order.save().then((data)=>{
                res.send(data);
            },err => res.status(400).send({reason:err}))

        })
    });
});

router.post('/',(req,res) => {
    const userUrl = req.body.userUrl;
    User.findOne({userUrl}).then((userData,err) => {
        ValidatorSrv.validateOrder(req.body,userData.id).then((results) => {
            const user_id = userData.id, pushToken = userData.notiflicationToken;
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
                        const notiflicationRequests = expo.chunkPushNotifications([{
                            to: pushToken,
                            sound: 'default',
                            body: 'This is a test notification',
                            data: { withSome: 'data' },
                        }]);
                        expo.sendPushNotificationsAsync(notiflicationRequests[0]).then((results) => {
                            console.log(results);
                            res.send(data);
                        })
                    }
                })
            }
        }).catch(err => {
            res.status(400).send({reason:err});
        });


    })

});

module.exports = router;