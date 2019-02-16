const mongoose = require('mongoose')

let CourseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    semester: {type: String},
    gpa: {type: Number, default: 0},
    assignments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Assignment'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
})

CourseSchema.methods.addAssignment = function(a, callback) {
    this.assignments.push(a)
    this.save(function (err) {
        if (err) return callback(err)
        callback(null)
    })
}

CourseSchema.methods.addComment = function(c, callback) {
    this.comments.push(c)
    this.save(function (err) {
        if (err) return callback(err)
        callback(null)
    })
}

CourseSchema.methods.updateGPA = function(callback) {
    var sum, count = 0
    this.assignments.forEach( (assignment) => {
        assignment.updateGPA( function (err) {
            if (err) return callback(err)
            sum += assignment.rating
        })
    })
    this.gpa = sum / count
    this.save(function(err) {
        if (err) return callback(err)
        callback(null)
    })
}

module.exports = mongoose.model('Course', CourseSchema)