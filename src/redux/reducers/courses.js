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
            return {
                ...state,
                courses: [...state.courses, action.course]
            };
        default:
            return state;
    }
};
