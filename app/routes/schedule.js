const express = require('express');
const Schedule = require('../models/schedule');
const router = express.Router();
const User = require('../models/user');
const Order = require('../models/order');
const moment = require('moment'); 
const ValidatorSrv = require('../services/validatorSrv');

authMW = require('../config/authByToken').authByToken;
router.post('/',authMW,(req,res) => {
    const schedule = new Schedule({
        user_id: req.user.id,
        duration:req.body.duration,
        times: req.body.times
    });
    schedule.save().then((data,err) => {
        if(err){
            res.status(400).send({reason:err});
        }
        else{
            res.send(data);
        }
    })
});
router.put('/',authMW,(req,res) => {
    Schedule.findOne({user_id:req.user.id}).then((scheduleObj,err) => {
        if(err || !scheduleObj){
            res.status(400).send({error:'Could not find schedule object'});
        }
        else{
            scheduleObj.set({duration:req.body.duration, times:req.body.times});
            scheduleObj.save().then((updatedObj,err) => {
                if(err){
                    res.status(400).send({error:'Could not update user schedule'});
                }
                else{
                     res.send(updatedObj);
                }
            })
        }
    });
});
router.post('/user',(req,res) => {
    const {userUrl,date} = req.body;
    let timesArr = [];
    User.findOne({userUrl}).then((userData,err) => {
        if(err){
            res.status(400).send({error:'Could not find user'});
            return;
        }
        Order.find({date,user_id:userData.id}).then((orders,err) => {
            Schedule.findOne({user_id:userData.id}).then((scheduleData,err) => {
                if(err){
                    res.status(400).send({error:'Could not find schedule'});
                    return;
                }
                const day = parseInt(moment(date).day(),10);
                let startHour = moment("01/01/2019 " + scheduleData.times[day].startHour),
                    endHour = moment("01/01/2019 " + scheduleData.times[day].endHour),
                    duration = scheduleData.duration;
                while(startHour.isBefore(endHour)){
                    let timeObj = {};
                    timeObj.startHour = startHour.format('HH:mm');
                    startHour = moment(startHour).add(duration,'m');
                    timeObj.endHour = startHour.format('HH:mm');
                    let takenOrder = ValidatorSrv.isOrderAlreayExist.invoke(orders,timeObj);
                    if(takenOrder){
                        timeObj.order = takenOrder;
                    }
                    timesArr.push(timeObj);
                }
                res.send({times:timesArr});
            }) 
        });
    });
})


module.exports = router;