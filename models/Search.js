const { number } = require('joi')
const mongoose = require('mongoose')

const search_schema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please provide user-friendly name for this search"],
        maxlength: 50
    },
    link:{
        type:String,
        required: [true, "Please provide link sorted by newest"]
    },
    createdByUser:{
        type: mongoose.Types.ObjectId,
        res: "User",
        required: [true, "Please provide user"]
    },
    active:{
        type: Boolean,
        required: true,
        default: false,
    },
    interval:{
        type: Number,
        required: true,
        default: 60,
    }
})

module.exports = mongoose.model('Search', search_schema)

