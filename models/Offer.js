const mongoose = require('mongoose')

const offer_schema = new mongoose.Schema({
    name:{
        type:String
    },
    link:{
        type:String
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    },
    found_on:{
        type:String,
        enum:{
            values:['olx', 'kleinanzeigen', 'autoscout', 'fly4free', 'mobile'],
            message:'{VALUE} is not supported'
        }
    },    
    createdBySearch: {
        type: mongoose.Types.ObjectId,
        ref: 'Search',
        required: [true, 'Please provide user']
    },
    createdByUser: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    },
})

module.exports = mongoose.model('Offer', offer_schema)