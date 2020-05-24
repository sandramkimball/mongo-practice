const mongoose = require('mongoose');

const CatSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: false
    },
    hobbies: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Cat', CatSchema)
