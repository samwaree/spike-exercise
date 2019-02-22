import { LOCATION_CHANGE } from "react-router-redux";

const initialState = {
    user: {},
    isAuth: false,
    loginError: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                isAuth: Object.keys(action.user).length > 0 ? true : false,
                user: action.user
            };
        case "USER_LOGOUT":
            return initialState;
        case "LOGIN_ERROR":
            return {
                ...state,
                loginError: true
            };
        case LOCATION_CHANGE:
            return state;
        default:
            return state;
    }
};
