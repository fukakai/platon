import {applyMiddleware, combineReducers, createStore} from "redux";
import logger from "redux-logger";
import users from "./reducers/users";
import ui from "./reducers/ui";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

export default createStore(
    combineReducers({
        ui,
        users
    }),
    {},
    applyMiddleware(
        logger,
        thunk,
        promise
    )
);
