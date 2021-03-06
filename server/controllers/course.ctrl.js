const Course = require("../models/Course"),
    User = require("../models/User"),
    Comment = require("../models/Comment");

module.exports = {
    /**
     * Creates a course
     * @param req.body.user_id  Id of the owner of course
     * @param req.body.name     Name of the course
     * @param req.body.semester Semester of the course
     */
    createCourse: (req, res, next) => {
        User.findById(req.body.user_id, (err, user) => {
            if (err) {
                res.sendStatus(500);
            } else if (!user) {
                res.sendStatus(400);
            } else {
                var course = new Course({
                    name: req.body.name,
                    semester: req.body.semester
                });
                course.save((err, newCourse) => {
                    if (err) {
                        res.sendStatus(500);
                    } else if (!newCourse) {
                        res.sendStatus(400);
                    } else {
                        user.addCourse(newCourse, err => {
                            if (err) {
                                res.sendStatus(500);
                            } else {
                                res.send(newCourse);
                            }
                        });
                    }
                });
            }
        });
    },
    /**
     * Deletes a course. Also deteles from all users
     * @param req.params.id Id of the course
     */
    deleteCourse: (req, res, next) => {
        Course.findByIdAndDelete(req.params.id, (err, course) => {
            if (err) {
                res.sendStatus(500);
            } else if (!course) {
                res.sendStatus(400);
            } else {
                // Removes the course from all users
                User.find({}, (err, users) => {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        users.forEach(user => {
                            user.removeCourse(course, (err, wasMatched) => {
                                if (err) {
                                    res.sendStatus(500);
                                }
                            });
                        });
                        res.json("Course successfully removed");
                    }
                });
            }
        });
    },
    /**
     * Gets a course
     * @param req.param.id id of the course
     */
    getCourse: (req, res, next) => {
        Course.findById(req.params.id)
            .populate("assignments")
            .populate("comments")
            .exec((err, course) => {
                if (err) {
                    res.sendStatus(500);
                } else if (!course) {
                    res.sendStatus(400);
                } else {
                    res.send(course);
                }
            });
    },
    /**
     * Gets all courses
     */
    getCourses: (req, res, next) => {
        Course.find({})
            .populate("assignments")
            .populate("comments")
            .exec((err, courses) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.send(courses);
                }
            });
    },
    /**
     * Creates a comment on a course
     * @param req.params.id     id of the course
     * @param req.body.user_id  id of the user
     * @param req.body.content  content of the comment
     */
    createComment: (req, res, next) => {
        Course.findById(req.params.id, (err, course) => {
            if (err) {
                res.sendStatus(500);
            } else if (!course) {
                console.log("Course not found");
                res.sendStatus(400);
            } else {
                User.findById(req.body.user_id, (err, user) => {
                    if (err) {
                        res.sendStatus(500);
                    } else if (!user) {
                        console.log("User not found");
                        res.sendStatus(400);
                    } else {
                        var comment = new Comment({
                            content: req.body.content,
                            poster: user
                        });
                        comment.save((err, newComment) => {
                            if (err) {
                                res.sendStatus(500);
                            } else {
                                course.addComment(newComment, err => {
                                    if (err) {
                                        res.sendStatus(500);
                                    } else {
                                        res.send(newComment);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    /**
     * Removes a comment and deletes it
     * @param req.params.id         id of the course
     * @param req.body.comment_id   id of the comment
     */
    deleteComment: (req, res, next) => {
        Course.findById(req.params.id, (err, course) => {
            if (err) {
                res.sendStatus(500);
            } else if (!course) {
                res.sendStatus(400);
            } else {
                Comment.findById(req.body.comment_id, (err, comment) => {
                    if (err) {
                        res.sendStatus(500);
                    } else if (!course) {
                        res.sendStatus(400);
                    } else {
                        course.removeComment(comment, (err, wasRemoved) => {
                            if (err) {
                                res.sendStatus(500);
                            } else if (!wasRemoved) {
                                res.sendStatus(400);
                            } else {
                                Comment.findByIdAndDelete(
                                    req.body.comment_id,
                                    err => {
                                        if (err) {
                                            res.sendStatus(500);
                                        } else {
                                            res.send(course);
                                        }
                                    }
                                );
                            }
                        });
                    }
                });
            }
        });
    }
};
