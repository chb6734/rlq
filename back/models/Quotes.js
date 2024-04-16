const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    contents: {
        type: String,
        uniqe: true,
        required: true
    },
    author: {
        type: String,
        required: true
    }
})

mongoose.model('Quotes', userSchema);