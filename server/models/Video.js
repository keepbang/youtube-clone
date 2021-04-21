const mongoose = require('mongoose');
const Schema = require('mongoose');

const videoSchema = mongoose.Schema({
    writer: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    title: {
        type:String,
        maxlength:50
    },
    description: String,
    privacy: {
        type:Number
    },
    category: {
        type:String
    },
    filePath: {
        type:String
    },
    views: {
        type:Number,
        default: 0
    },
    duration: {
        type:String
    },
    thumbnail: {
        type:String
    }

},{timestamp: true});


const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }