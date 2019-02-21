const initialState = {
    courses: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_COURSES':
            return {
                ...state,
                courses: action.courses
            }
        default:
            return state
    }
}