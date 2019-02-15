const mongoose = require('mongoose')

let AssignmentSchema = new mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String},
    ratings: [{type: Number}]
})

AssignmentSchema.methods.addRating = function(rat, callback) {
    this.ratings.push(rat)
    this.save(function (err) {
        if (err) return callback(err)
        callback(null)
    })
}
module.exports = mongoose.model('Assignment', AssignmentSchema)