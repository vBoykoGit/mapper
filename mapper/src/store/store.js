import {
    createStore,
    combineReducers,
    applyMiddleware
} from "redux";
import thunk from 'redux-thunk'
import {
    createLogger
} from 'redux-logger'
import route from './reducers/routeReducer';

const loggerMiddleware = createLogger();

const middleware = () => [
    thunk,
    loggerMiddleware,
]

const storeFactory = (initialState = {}) => {
    const store = applyMiddleware(...middleware())(createStore)(combineReducers({
        route
    }), initialState);

    return store
}

export default storeFactory;