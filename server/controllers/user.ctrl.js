const User = require('../models/User'),
      Course = require('../models/Course');

module.exports = {
    createUser: (req, res, next) => {

        var user = new User({
            username: req.body.username,
            password: req.body.password
        })

        user.save( function (err, newUser) {
            if (err) {
                res.send(err)
            } else if (!newUser) {
                res.send(400)
            } else {
                res.send(newUser)
            }
        })
    },
    deleteUser: (req, res, next) => {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                res.sendStatus(500)
            } else if (!user) {
                res.sendStatus(400)
            } else {
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (err) {
                        res.sendStatus(500)
                    } else if (!isMatch) {
                        res.sendStatus(400)
                    } else {
                        User.deleteOne(user, (err) => {
                            if (err) {
                                console.log(err)
                                res.sendStatus(500)
                            }
                            res.send(user)
                        })
                    }
                })
            }
        })
    },
    getUser: (req, res, next) => {
        User.findById(req.params.id, (err, user) => {
            if (err) {
            } else if (!user) {
                res.sendStatus(400)
            } else {
                res.send(user)
            }
        })
    },
    addCourse: (req, res, next) => {
        User.findById(req.body.user_id, (err, user) => {
            if (err) {
                res.send(err)
            } else if (!user) {
                res.send(400)
            } else {
                user.addCourse( req.body.course_id, (err, user) => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send(user)
                    }
                })
            }
        })
    }
}
