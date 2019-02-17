const Assignment = require('../models/Assignment'),
      Course = require('../models/Course')

module.exports = {
    /**
     * Creates an assignment
     * @param req.body.course_id    The course id of the course of the assignment
     * @param req.body.name         The name of the assignment
     * @param req.body.description  The description of the assignment
     */
    createAssignment: (req, res, next) => {
        Course.findById(req.body.course_id, (err, course) => {
            if (err) {
                res.sendStatus(500)
            } else if (!course) {
                res.json('Course doesnt exist')
            } else {
                var assignment = new Assignment( {
                    name: req.body.name,
                    description: req.body.description
                })

                assignment.save((err, newAssignment) => {
                    if (err) {
                        res.sendStatus(500)
                    } else if (!newAssignment) {
                        res.sendStatus(500)
                    } else {
                        course.addAssignment(newAssignment, (err, result) => {
                            if (err) {
                                res.sendStatus(500)
                            } else if (!result) {
                                res.json('Assignment already exists')
                            } else {
                                res.send(newAssignment)
                            }
                        })
                    }
                })
            }
        })
    },
    /**
     * Deletes an assignment
     * @param req.params.id         id of the assignment
     * @param req.body.course_id    id of the course
     */
    deleteAssignment: (req, res, next) => {
        Course.findById(req.body.course_id, (err, course) => {
            if (err) {
                res.sendStatus(500)
            } else if (!course) {
                res.json('Course does not exist')
            } else {
                Assignment.findById(req.params.id, (err, assignment) => {
                    if (err) {
                        res.sendStatus(500)
                    } else if (!assignment) {
                        res.json('Assignment does not exist')
                    } else {
                        course.removeAssignment(assignment, (err, isRemoved) => {
                            if (err) {
                                res.sendStatus(500)
                            } else if (!isRemoved) {
                                res.json('Assignment does not belong to this course')
                            } else {
                                Assignment.findByIdAndDelete(req.params.id, (err) => {
                                    if (err) {
                                        res.sendStatus(500)
                                    } else {
                                        res.json('Assignment successfully deleted')
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
     * Update the assignment description
     * @param req.params.id         Id of the assignment
     * @param req.body.description  new description
     */
    updateDescription: (req, res, next) => {
        Assignment.findById(req.params.id, (err, assignment) => {
            if (err) {
                res.sendStatus(500)
            } else if (!assignment) {
                res.sendStatus(400)
            } else {
                assignment.description = req.body.description
                assignment.save((err, newAssignment) => {
                    if (err) {
                        res.sendStatus(500)
                    } else {
                        res.send(newAssignment)
                    }
                })
            }
        })
    },
    /**
     * Adds a rating for the assignment and updates GPA
     * @param req.params.id     id of the assignment
     * @param req.body.rating   rating of the assignment
     */
    rate: (req, res, next) => {
        Assignment.findById(req.params.id, (err, assignment) => {
            if (err) {
                res.sendStatus(500)
            } else if (!assignment) {
                res.sendStatus(400)
            } else {
                assignment.addRating(req.body.rating, (err) => {
                    if (err) {
                        res.sendStatus(500)
                    } else {
                        assignment.updateGPA((err) => {
                            if (err) {
                                res.sendStatus(500)
                            } else {
                                res.send(assignment)
                            }
                        })
                    }
                })
            }
        })
    }
}