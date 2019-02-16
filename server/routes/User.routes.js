const User = require('../controllers/user.ctrl')

module.exports = (router) => {
    router.route('/user').post(User.createUser)

    router.route('/user/:id').delete(User.deleteUser)

    router.route('/user/:id').get(User.getUser)

    router.route('/user/:id/updatepass').post(User.updatePassword)

    router.route('/user/:id/updateusr').post(User.updateUsername)

    router.route('/user/removecourse').post(User.removeCourse)

    router.route('/user/addcourse').post(User.addCourse)
}