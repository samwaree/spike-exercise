const mongoose = require('mongoose')

let CourseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    semester: {type: String},
    gpa: {type: Number, default: 0},
    assignments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Assignment'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
})

CourseSchema.methods.addAssignment = function(a, callback) {
    var index = this.assignments.findIndex((el) => {
        return el.equals(a._id)
    })
    if (index !== -1) {
        return callback(null, null)
    } else {
        this.assignments.push(a)
        this.save(function (err) {
            if (err) return callback(err)
            callback(null, this)
        })
    }
}

CourseSchema.methods.removeAssignment = function(a, callback) {
    var index = this.assignments.findIndex((el) => {
        return el.equals(a._id)
    })
    if (index !== -1) {
        this.assignments.splice(index, 1)
        this.save(function (err) {
            if (err) return callback(err)
            return callback(null, true)
        })
    } else {
        return callback(null, false)
    }
}

CourseSchema.methods.addComment = function(c, callback) {
    this.comments.push(c)
    this.save(function (err) {
        if (err) return callback(err)
        callback(null)
    })
}

module.exports = mongoose.model('Course', CourseSchema)