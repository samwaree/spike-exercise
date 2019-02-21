import axios from 'axios'

const url = "http://localhost:8080/api/"

export function loadCourses () {
    return (dispatch) => {
        axios.get(`${url}courses`)
        .then((res) => {
            let courses = res.data;
            dispatch({type: 'LOAD_COURSES', courses})
        }).catch((err) => {
            console.log(err)
        })
    }
}

export function createCourse(course_data, callback) {
    return (dispatch) => {
        console.log(course_data)
        axios.post(`${url}course`, course_data)
        .then((res) => {
            let course = res.data;
            callback()
            dispatch({type: 'ADD_COURSE', course})
        }).catch((err) => {
            console.log(err)
        })
    }

}

export function createUser (user_data) {
    return (dispatch) => {
        axios.post(`${url}user`, user_data)
        .then((res) => {
            let user = res.data
            localStorage.setItem('Auth', user._id)
            dispatch({type: 'SET_USER', user})
        }).catch((err)=>{
            console.log(err)
        })
    }
}

export function logoutUser () {
    return(dispatch) => {
        dispatch({type: "USER_LOGOUT"})
    }
}

export function loginUser(user_data) {
    return (dispatch) => {
        const username = user_data.username
        axios.post(`${url}user/${username}`, {password: user_data.password})
        .then((res) => {
            let user = res.data
            localStorage.setItem('Auth', user._id)
            dispatch({type: 'SET_USER', user})
        }).catch((err) => {
            console.log(err)
            dispatch({type: 'LOGIN_ERROR'})
        })
    }
}