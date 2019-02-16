const mongoose = require('mongoose')

let AssignmentSchema = new mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String},
    gpa: {type: Number},
    ratings: [{type: Number}]
})

AssignmentSchema.methods.addRating = function(rat, callback) {
    this.ratings.push(rat)
    this.save(function (err) {
        if (err) return callback(err)
        callback(null)
    })
}

AssignmentSchema.methods.updateGPA = function(callback) {
    var sum, count
    this.ratings.forEach((rating) => {
        sum += rating
        count++
    })
    this.gpa = sum / count
    callback()
}

module.exports = mongoose.model('Assignment', AssignmentSchema)