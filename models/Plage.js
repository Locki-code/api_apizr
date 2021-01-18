const mongoose = require('mongoose');

const PlageSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    quality: {
        type: String,
        required: true 
    },
    date: {
        type: Date,
        default: Date.now,
        required: true 
    }
});

module.exports = mongoose.model('Plage',PlageSchema);