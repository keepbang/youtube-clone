const express = require('express');
const router = express.Router();
const { Subscriber } = require("../models/Subscriber");

const { auth } = require("../middleware/auth");



//=================================
//             Subscribe
//=================================


router.post('/subscribeNumber', (req, res) => {
    Subscriber.find({'userTo': req.body.userTo})
        .exec((err,subscribe) => {
           if(err) return res.status(400).send(err);
           return res.status(200).json({success: true, subscribeNumber: subscribe.length})
        });
});

router.post('/subscribed', (req, res) => {
    Subscriber.find({'userTo': req.body.userTo, 'fromTo': req.body.fromTo})
        .exec((err,subscribe) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({success: true, isSubscribed: (subscribe.length !== 0)})
        });
});

router.post('/unSubscribe', (req,res) => {
    Subscriber.findOneAndDelete({userTo: req.body.userTo, userFrom:req.body.userFrom})
        .exec((err,doc) => {
            if(err) return res.status(400).json({success: false, err})
            return res.status(200).json({success: true, doc})
        })
})

router.post('/subscribe', (req, res) => {
    const subscribe = new Subscriber(res.body);
    subscribe.save((err,doc) => {
        if(err) return res.status(400).json({success: false, err})
        return res.status(200).json({success: true})
    })
});

module.exports = router;
