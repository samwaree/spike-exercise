const Assignment = require("../models/Assignment"),
    Course = require("../models/Course");

function updateParentGPA(course_id, callback) {
    Course.findById(course_id)
        .populate("assignments")
        .exec((err, course) => {
            if (err) return callback(err);
            var sum = 0,
                count = 0;
            course.assignments.forEach(element => {
                if (element.ratings.length > 0) {
                    sum += element.gpa;
                    count++;
                }
            });
            if (count === 0) {
                course.gpa = 0;
            } else {
                course.gpa = sum / count;
            }
            course.save((err, newCourse) => {
                if (err) {
                    return callback(err);
                } else {
                    callback(null);
                }
            });
        });
}

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
                res.sendStatus(500);
            } else if (!course) {
                res.json("Course doesnt exist");
            } else {
                var assignment = new Assignment({
                    name: req.body.name,
                    description: req.body.description,
                    parent: course._id
                });

                assignment.save((err, newAssignment) => {
                    if (err) {
                        res.sendStatus(500);
                    } else if (!newAssignment) {
                        res.sendStatus(500);
                    } else {
                        course.addAssignment(newAssignment, (err, result) => {
                            if (err) {
                                res.sendStatus(500);
                            } else if (!result) {
                                res.json("Assignment already exists");
                            } else {
                                res.send(newAssignment);
                            }
                        });
                    }
                });
            }
        });
    },
    /**
     * Deletes an assignment
     * @param req.params.id         id of the assignment
     */
    deleteAssignment: (req, res, next) => {
        Assignment.findById(req.params.id, (err, assignment) => {
            if (err) {
                res.sendStatus(500);
            } else if (!assignment) {
                res.sendStatus(400);
            } else {
                Course.findById(assignment.parent, (err, course) => {
                    if (err) {
                        res.sendStatus(500);
                    } else if (!course) {
                        res.sendState(400);
                    } else {
                        course.removeAssignment(
                            assignment,
                            (err, isRemoved) => {
                                if (err) {
                                    res.sendStatus(500);
                                } else if (!isRemoved) {
                                    res.json(
                                        "Assignment does not belong to this course"
                                    );
                                } else {
                                    Assignment.findByIdAndDelete(
                                        req.params.id,
                                        err => {
                                            if (err) {
                                                res.sendStatus(500);
                                            } else {
                                                updateParentGPA(
                                                    assignment.parent,
                                                    err => {
                                                        if (err) {
                                                            res.sendStatus(500);
                                                        } else {
                                                            res.json(
                                                                "Assignment successfully deleted"
                                                            );
                                                        }
                                                    }
                                                );
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                });
            }
        });
    },
    /**
     * Update the assignment description
     * @param req.params.id         Id of the assignment
     * @param req.body.description  new description
     */
    updateDescription: (req, res, next) => {
        Assignment.findById(req.params.id, (err, assignment) => {
            if (err) {
                res.sendStatus(500);
            } else if (!assignment) {
                res.sendStatus(400);
            } else {
                assignment.description = req.body.description;
                assignment.save((err, newAssignment) => {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.send(newAssignment);
                    }
                });
            }
        });
    },
    /**
     * Adds a rating for the assignment and updates GPA
     * @param req.params.id     id of the assignment
     * @param req.body.rating   rating of the assignment
     * @param req.body.description description of rating
     */
    rate: (req, res, next) => {
        Assignment.findById(req.params.id, (err, assignment) => {
            if (err) {
                res.sendStatus(500);
            } else if (!assignment) {
                res.sendStatus(400);
            } else {
                assignment.addRating(
                    {
                        number: req.body.rating,
                        description: req.body.description
                    },
                    err => {
                        if (err) {
                            res.sendStatus(500);
                        } else {
                            assignment.updateGPA(err => {
                                if (err) {
                                    res.sendStatus(500);
                                } else {
                                    updateParentGPA(assignment.parent, err => {
                                        if (err) {
                                            res.sendStatus(500);
                                        } else {
                                            res.send(assignment);
                                        }
                                    });
                                }
                            });
                        }
                    }
                );
            }
        });
    }
};
