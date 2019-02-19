const mongoose = require('mongoose'),
      bcrypt = require('bcrypt'),
      SALT_WORK_FACTOR = 10


let UserSchema = new mongoose.Schema({
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
})

/**
 * Hash pasword before putting in db
 */
UserSchema.pre('save', function(next) {
    var user = this;

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

UserSchema.methods.addCourse = function(c, callback) {
    var index = this.courses.findIndex((el) => {
        return el.equals(c._id)
    })
    if (index !== -1) {
        return callback(null, null)
    } else {
        this.courses.push(c)
        this.save(function (err){
            if (err) return callback(err)
            callback(null, this)
        })
    }
}

UserSchema.methods.removeCourse = function(c, callback) {
    var index = this.courses.findIndex((el) => {
        return el.equals(c._id)
    })
    if (index !== -1) {
        this.courses.splice(index, 1)
        this.save(function (err) {
            if (err) return callback (err)
        })
        callback(null, true)
    } else {
        callback(null, false)
    }
}

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            callback(err)
            return
        }
        callback(null, isMatch)
    })
}

module.exports = mongoose.model('User', UserSchema)