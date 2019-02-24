const User = require("../controllers/user.ctrl");

module.exports = router => {
    router.route("/user").post(User.createUser);

    router.route("/user/:id").get(User.getUserByID);

    router.route("/user/:id").delete(User.deleteUser);

    router.route("/user/:id").post(User.getUser);

    router.route("/user/:id/updatepass").post(User.updatePassword);

    router.route("/user/:id/updateusr").post(User.updateUsername);

    router.route("/user/:id/removecourse").post(User.removeCourse);

    router.route("/user/:id/addcourse").post(User.addCourse);
};
