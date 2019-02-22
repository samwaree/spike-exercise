const initialState = {
    courses: [],
    triggerAssignment: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_COURSES":
            return {
                ...state,
                courses: action.courses
            };
        case "ADD_COURSE":
            let courses = Object.assign({}, state.courses.courses);
            courses.push(action.course);
            return {
                ...state,
                courses: courses
            };
        default:
            return state;
    }
};
