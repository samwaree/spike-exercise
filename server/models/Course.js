const mongoose = require('mongoose')

let CourseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    semester: {type: String},
    gpa: {type: Number},
    assignments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Assignment'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
})

//TODO: Add assignment method

//TODO: Add get assignments method

//TODO: Add comment method

//TODO: Update GPA method

module.exports = mongoose.model('Course', CourseSchema)