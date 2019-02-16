const User = require('../controllers/user.ctrl')

module.exports = (router) => {
    router.route('/user').post(User.createUser)

    router.route('/user/:id').delete(User.deleteUser)

    router.route('/user/:id').get(User.getUser)
}