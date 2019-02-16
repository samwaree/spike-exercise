const Course = require('../controllers/course.ctrl')

module.exports = (router) => {
    router.route('/course').post(Course.createCourse)

    router.route('/course/:id').delete(Course.deleteCourse)

    router.route('/course/:id').get(Course.getCourse)
}