const User = require('./User.routes')
const Course = require('./Course.routes')
const Assignment = require('./Assignment.routes')

module.exports = (router) => {
    User(router)
    Course(router)
    Assignment(router)
}