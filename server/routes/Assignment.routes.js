const Assignment = require('../controllers/assignment.ctrl')

module.exports = (router) => {
    router.route('/assignment').post(Assignment.createAssignment)

    router.route('/assignment/:id').delete(Assignment.deleteAssignment)

    router.route('/assignment/:id/updatedesc').post(Assignment.updateDescription)

    router.route('/assignment/:id/rate').post(Assignment.rate)
}