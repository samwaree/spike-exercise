const mongoose = require('mongoose')

let CommentSchema = new mongoose.Schema({
    content: {type: String, required: true},
    poster: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

module.exports = mongoose.model('Comment', CommentSchema)