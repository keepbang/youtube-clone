const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    writer: {
        type:String,
        maxlength:50
    },
    title: {
        type:String,
        maxlength:50
    },
    description: {
        type:String,
        maxlength:50
    },
    privacy: {
        type:String,
        maxlength:50
    },
    category: {
        type:String,
        maxlength:50
    },
    filePath: {
        type:String,
        maxlength:50
    },
    views: {
        type:String,
        maxlength:50
    },
    duration: {
        type:String,
        maxlength:50
    },
    thumbnail: {
        type:String,
        maxlength:50
    }
})


const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }