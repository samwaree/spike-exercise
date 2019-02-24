import axios from "axios";

const url = "http://localhost:8080/api/";

export function loadCourses(callback) {
    return dispatch => {
        axios
            .get(`${url}courses`)
            .then(res => {
                let courses = res.data;
                dispatch({ type: "LOAD_COURSES", courses });
                callback();
            })
            .catch(err => {
                console.log(err);
            });
    };
}

export function createCourse(course_data, callback) {
    return dispatch => {
        console.log(course_data);
        axios
            .post(`${url}course`, course_data)
            .then(res => {
                let course = res.data;
                callback();
                dispatch({ type: "ADD_COURSE", course });
            })
            .catch(err => {
                console.log(err);
            });
    };
}

export function createUser(user_data) {
    return dispatch => {
        axios
            .post(`${url}user`, user_data)
            .then(res => {
                let user = res.data;
                localStorage.setItem("Auth", user._id);
                dispatch({ type: "SET_USER", user });
            })
            .catch(err => {
                console.log(err);
            });
    };
}

export function logoutUser() {
    return dispatch => {
        dispatch({ type: "USER_LOGOUT" });
    };
}

export function loginUser(user_data) {
    return dispatch => {
        const username = user_data.username;
        axios
            .post(`${url}user/${username}`, { password: user_data.password })
            .then(res => {
                let user = res.data;
                localStorage.setItem("Auth", user._id);
                dispatch({ type: "SET_USER", user });
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: "LOGIN_ERROR" });
            });
    };
}

export function rateAssignment(assignment_data, callback) {
    return dispatch => {
        let assignment_id = assignment_data.id;
        axios
            .post(`${url}assignment/${assignment_id}/rate`, {
                rating: assignment_data.rating,
                description: assignment_data.description
            })
            .then(res => {
                callback();
            });
    };
}

export function createAssignment(assignment_data, callback) {
    return dispatch => {
        axios
            .post(`${url}assignment`, {
                course_id: assignment_data.course_id,
                name: assignment_data.name,
                description: assignment_data.description
            })
            .then(res => {
                callback();
            });
    };
}

export function comment(data, callback) {
    return dispatch => {
        const id = data.course_id;
        console.log(data);
        axios
            .post(`${url}course/${id}/comment`, {
                content: data.content,
                user_id: data.user_id
            })
            .then(res => {
                callback();
            });
    };
}

export function editDescription(data, callback) {
    return dispatch => {
        axios
            .post(`${url}assignment/${data.id}/updatedesc`, {
                description: data.description
            })
            .then(res => {
                callback();
            });
    };
}

export function deleteAssignment(data, callback) {
    return dispatch => {
        axios.delete(`${url}assignment/${data.assignment_id}`).then(res => {
            callback();
        });
    };
}

export function addCourse(data, callback) {
    return dispatch => {
        console.log(data);
        axios
            .post(`${url}user/${data.user_id}/addcourse`, {
                course_id: data.course_id
            })
            .then(callback());
    };
}
