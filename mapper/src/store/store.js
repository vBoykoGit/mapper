import {
    createStore,
    combineReducers,
    applyMiddleware
} from "redux";
import thunk from 'redux-thunk'
import {
    createLogger
} from 'redux-logger'
import routeReducer from './reducers/routeReducer';

const loggerMiddleware = createLogger();

const middleware = () => [
    thunk,
    loggerMiddleware,
]

const storeFactory = (initialState = {}) => {
    const store = applyMiddleware(...middleware())(createStore)(combineReducers({
        routeReducer
    }), initialState);

    return store
}

export default storeFactory;