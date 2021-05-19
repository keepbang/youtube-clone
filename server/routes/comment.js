const express = require('express');
const router = express.Router();


const { Comment } = require("../models/Comment");

//=================================
//             Comment
//=================================


router.post("/saveComment", (req, res) => {

    const comment = new Comment(req.body);

    if(req.body.writer){
        return res.json({success: false});
    }

    comment.save((err1, comment) => {
        if(err1) return res.json({success: false, err1});

        Comment.find({'_id': comment._id})
            .populate('writer')
            .exec((err2, result) => {
                if(err2) return res.json({success: false, err2});
                res.status(200).json({success: true, result})
            })
    })

});

router.post("/getComments", (req, res) => {
 Comment.find({'videoId':req.body.videoId})
        .populate('writer')
        .exec((err, comments) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({success: true, comments})
        })
})

module.exports = router;