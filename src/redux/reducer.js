import { combineReducers } from "redux";
import courses from "./reducers/courses";
import user from "./reducers/user";
import { connectRouter } from "connected-react-router";

export default history =>
    combineReducers({
        courses,
        user,
        router: connectRouter(history)
    });
