const User = require('../models/User'),
      Course = require('../models/Course');

module.exports = {
    /**
     * Creates a new user
     * @param {String} req.body.username Username of new account
     * @param {String} req.body.password Password of new account
     */
    createUser: (req, res, next) => {
        var user = new User({
            username: req.body.username,
            password: req.body.password
        })

        user.save( function (err, newUser) {
            if (err) {
                res.sendStatus(500)
            } else if (!newUser) {
                res.sendStatus(400)
            } else {
                res.send(newUser)
            }
        })
    },
    /**
     * Deletes a user
     * @param req.params.id     id of account to delete
     * @param req.body.password Password of account to delete
     */
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
    /**
     * Get a user
     * @param req.params.id id of user to get
     */
    getUser: (req, res, next) => {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                res.sendStatus(500)
            } else if (!user) {
                res.sendStatus(400)
            } else {
                res.send(user)
            }
        })
    },
    /**
     * Update password of user
     * @param req.params.id         id of user
     * @param req.body.oldPassword  Users old password
     * @param req.body.newPassword1 User's attempted new password
     * @param req.body.newPassword2 User's confirmation password
     */
    updatePassword: (req, res, next) => {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                res.sendStatus(500)
            } else if (!user) {
                res.sendStatus(400)
            } else {
                user.comparePassword(req.body.oldPassword, (err, isMatch) => {
                    if (err) {
                        res.sendStatus(500)
                    } else if (!isMatch) {
                        res.sendStatus(400)
                    } else {
                        if (req.body.newPassword1 === req.body.newPassword2) {
                            user.password = req.body.newPassword1
                            user.save((err) => {
                                if (err) {
                                    res.sendStatus(500)
                                } else {
                                    res.send(user)
                                }
                            })
                        } else {
                            res.sendStatus(400)
                        }
                    }
                })
            }
        })
    },
    /**
     * Updates the username of a user
     * @param req.params.id         id of user
     * @param req.body.password     Password of user
     * @param req.body.newUsername  New username of user
     */
    updateUsername: (req, res, next) => {
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
                        User.findOne({username: req.body.newUsername}, (err, newUser) => {
                            if (err) {
                                res.sendStatus(500)
                            } else if (newUser) {
                                console.log('Username already exists:', req.body.newUsername)
                                res.sendStatus(400)
                            } else {
                                user.username = req.body.newUsername
                                user.save((err) => {
                                    if (err) {
                                        res.sendStatus(500)
                                    } else {
                                        res.send(user)
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },
    /**
     * Adds a course to a users course list
     * @param req.body.user_id      user id of user
     * @param req.body.course_id    course id
     */
    addCourse: (req, res, next) => {
        User.findById(req.body.user_id, (err, user) => {
            if (err) {
                res.sendStatus(500)
            } else if (!user) {
                res.sendStatus(400)
            } else {
                Course.findById(req.body.course_id, (err, course) => {
                    if (err) {
                        res.sendStatus(500)
                    } else if (!course) {
                        res.json('Course was not found')
                    } else {
                        user.addCourse( course, (err, newUser) => {
                            if (err) {
                                res.sendStatus(500)
                            } else if (!newUser) {
                                res.json('Course already added')
                            } else {
                                res.json('Course added successfully')
                            }
                        })
                    }
                })
            }
        })
    },
    /**
     * Removes a course from a users course list
     * @param req.body.user_id id of the user
     * @param req.body.course_id id of the course
     */
    removeCourse: (req, res, next) => {
        User.findById(req.body.user_id, (err, user) => {
            if (err) {
                res.sendStatus(500)
            } else if (!user) {
                res.sendStatus(400)
            } else {
                user.removeCourse({_id: req.body.course_id}, (err, wasDeleted) => {
                    if (err) {
                        res.sendStatus(500)
                    } else if (!wasDeleted) {
                        res.json('Course was not found')
                    } else {
                        res.json('Course removed successfully')
                    }
                })
            }
        })
    }
}
