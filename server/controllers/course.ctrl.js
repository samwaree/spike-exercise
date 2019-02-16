const Course = require('../models/Course'),
      User = require('../models/User')

module.exports = {
    createCourse: (req, res, next) => {
        User.findById(req.body.user_id, (err, user) => {
            if (err) {
                res.sendStatus(500)
            } else if (!user) {
                res.sendStatus(400)
            } else {
                var course = new Course({
                    name: req.body.name,
                    semester: req.body.semester
                })
                course.save((err, newCourse) => {
                    if (err) {
                        res.sendStatus(500)
                    } else if (!newCourse) {
                        res.sendStatus(400)
                    } else {
                        user.addCourse(newCourse, (err) => {
                            if (err) {
                                res.sendStatus(500)
                            } else {
                                res.send(newCourse)
                            }
                        })
                    }
                })
            }
        })
    }, 
    deleteCourse: (req, res, next) => {
        Course.findByIdAndDelete(req.params.id, (err, course) => {
            if (err) {
                res.sendStatus(500)
            } else if (!course) {
                res.sendStatus(400)
            } else {
                User.find({}, (err, users) => {
                    if (err) {
                        res.sendStatus(500)
                    } else {
                        users.forEach((user) => {
                            user.removeCourse(course, (err, wasMatched) => {
                                if (err) {
                                    res.sendStatus(500)
                                }
                            })
                        })
                        res.json('Course successfully removed')
                    }
                })
            }
        })
    },
    getCourse: (req, res, next) => {
        Course.findById(req.params.id).exec((err, course) => {
            if (err) {
                res.sendStatus(500)
            } else if (!course) {
                res.sendStatus(400)
            } else {
                course.updateGPA(function () {
                    res.send(course)
                })
            }
        })
    },
}