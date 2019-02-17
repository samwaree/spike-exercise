const Course = require('../controllers/course.ctrl')

module.exports = (router) => {
    router.route('/course').post(Course.createCourse)

    router.route('/course/:id').delete(Course.deleteCourse)

    router.route('/course/:id').get(Course.getCourse)

    router.route('/course/:id/comment').post(Course.createComment)

    router.route('/course/:id/comment').delete(Course.deleteComment)
}