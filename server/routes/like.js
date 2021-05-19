const express = require('express');
const router = express.Router();


const { Like } = require("../models/Like");
const { DisLike } = require("../models/DisLike");

//=================================
//             Like
//=================================

router.post("/getLikes", (req, res) => {

    let variable = {};

    if(req.body.videoId){
        variable = {videoId : req.body.videoId}
    }else{
        variable = {commentId : req.body.commentId}
    }

    Like.find(variable)
        .exec((err, likes) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({success: true, likes})
        })
})

router.post("/getDisLikes", (req, res) => {

    let variable = {};

    if(req.body.videoId){
        variable = {videoId : req.body.videoId}
    }else{
        variable = {commentId : req.body.commentId}
    }

    DisLike.find(variable)
        .exec((err, dislikes) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({success: true, dislikes})
        })
})

router.post("/upLike", (req, res) => {

    let variable = {
        userId : req.body.userId
    };

    if(req.body.videoId){
        variable.videoId = req.body.videoId
    }else{
        variable.commentId = req.body.commentId
    }

    // Like collection에다가 클릭 정보를 넣어준다.

    const like = new Like(variable)

    like.save((err, likeResult) => {
        if(err) return res.json({success: false, err});
        // 만약에 Dislike 이 이미 클릭 되있다면, Dislike을 1 줄여준다.
        DisLike.deleteOne(variable)
            .exec((err,disLikeResult) => {
                if(err) return res.status(400).json({success: false, err})
                res.status(200).json({success: true})
        })
    })

})

router.post("/unLike", (req, res) => {

    let variable = {
        userId : req.body.userId
    };

    if(req.body.videoId){
        variable.videoId = req.body.videoId
    }else{
        variable.commentId = req.body.commentId
    }

    Like.deleteOne(variable)
        .exec((err, result) => {
            if(err) return res.status(400).json({success: false, err})
            res.status(200).json({success: true})
        })

})

router.post("/upDisLike", (req, res) => {

    let variable = {
        userId : req.body.userId
    };

    if(req.body.videoId){
        variable.videoId = req.body.videoId
    }else{
        variable.commentId = req.body.commentId
    }

    // Like collection에다가 클릭 정보를 넣어준다.

    const dislike = new DisLike(variable)

    dislike.save((err, disLikeResult) => {
        if(err) return res.json({success: false, err});
        // 만약에 Dislike 이 이미 클릭 되있다면, Dislike을 1 줄여준다.
        Like.deleteOne(variable)
            .exec((err,likeResult) => {
                if(err) return res.status(400).json({success: false, err})
                res.status(200).json({success: true})
            })
    })

})

router.post("/unDisLike", (req, res) => {

    let variable = {
        userId : req.body.userId
    };

    if(req.body.videoId){
        variable.videoId = req.body.videoId
    }else{
        variable.commentId = req.body.commentId
    }


    DisLike.deleteOne(variable)
        .exec((err, result) => {
            if(err) return res.status(400).json({success: false, err})
            res.status(200).json({success: true})
        })

})

module.exports = router;