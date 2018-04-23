const express = require('express');
const Schedule = require('../models/schedule');
const router = express.Router();

router.post('/',(req,res) => {
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

module.exports = router;