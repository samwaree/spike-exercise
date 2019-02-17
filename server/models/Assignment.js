const mongoose = require('mongoose')

let AssignmentSchema = new mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String},
    gpa: {type: Number, default: 0},
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
    var sum = 0, count = 0
    this.ratings.forEach((rating) => {
        sum += rating
        count++
    })
    this.gpa = sum / count
    this.save(function(err) {
        if (err) return callback(err)
        callback(null)
    })
}

module.exports = mongoose.model('Assignment', AssignmentSchema)