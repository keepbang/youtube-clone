const express = require('express');
const router = express.Router();


const { Like } = require("../models/Like");
const { DisLike } = require("../models/DisLike");

//=================================
//             Like
//=================================

router.post("/getLikes", (req, res) => {

    let variable = {}

    if(req.body.videoId){
        variable = {videoId : req.body.videoId}
    }else{
        variable = {commentId : req.body.commentId}
    }

    Like.find(variable)
        .exec((err, likes) => {
            if(err) return res.status(400).send(err)
            res.status(200).join({success: true, likes})
        })

    DisLike.find(variable)
        .exec((err, dislikes) => {
            if(err) return res.status(400).send(err)
            res.status(200).join({success: true, dislikes})
        })
})

module.exports = router;