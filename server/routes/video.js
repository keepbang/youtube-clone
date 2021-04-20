const express = require('express');
const router = express.Router();
// const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
var ffmpeg = require("fluent-ffmpeg");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req,file,cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
})

const upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            const ext = path.extname(file.originalname);

            if(ext != '.mp4'){
                return cb(new Error('only jpg, png, mp4 is allowed'), false);
            }
            cb(null, true);
        }
    }).single("file");

//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
    // 비디오를 서버에 저장한다.
    upload(req, res, err => {
        if(err){
            return res.json({success: false, err})
        }
        return res.json({success: true, url: res.req.file.path, fileName: res.req.file.filename});
    })
})

router.post('/thumbnail', (req, res) => {
    // 썸네일 생성 하고 비디오 러닝타임도 가져오.

    let filePath = "";
    let fileDuration = "";

    ffmpeg.ffprobe(req.body.filePath, function(err, metadata){
        fileDuration = metadata.format.duration;
    })

    ffmpeg(req,body,url)
        .on('filenames',function(filenames){
            console.log('Will generate' + filenames.join(', '));
            console.log(filenames);

            filePath = "uploads/thumbnails/" + filenames[0]
        })
        .on('end', function(){
            console.log('Screenshots taken');
            return res.json({success: true, url: filePath, fileDuration: fileDuration})
        })
        .on('error', function(err){
            console.error(err);
            return res.json({success: false,err});
        })
        .screenshot({
            count: 3,
            folder: 'uploads/thumbnails',
            size: '320x240',
            filename: 'thumbnail-%b.png'
        });
})

module.exports = router;
