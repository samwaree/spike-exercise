const User = require('./User.routes')
const Course = require('./Course.routes')

module.exports = (router) => {
    User(router)
    Course(router)
}