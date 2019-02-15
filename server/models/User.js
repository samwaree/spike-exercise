const mongoose = require('mongoose'),
      bcrypt = require('bcrypt'),
      SALT_WORK_FACTOR = 10


let UserSchema = new mongoose.Schema({
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}] //TODO: make sure this works
})

UserSchema.pre('save', function(next) {
    var user = this;
    console.log('Ran pre')
    if (!user.isModified('password')) {
        return next()
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err)
        callback(null, isMatch)
    })
}

module.exports = mongoose.model('User', UserSchema)