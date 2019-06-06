import {
    createStore,
    combineReducers,
    applyMiddleware
} from "redux";
import thunk from 'redux-thunk'
import {
    createLogger
} from 'redux-logger'

const loggerMiddleware = createLogger();

const middleware = () => [
    thunk,
    loggerMiddleware,
]

const storeFactory = (initialState = {}) => {
    const store = applyMiddleware(...middleware())(createStore)(combineReducers({

    }), initialState);

    return store
}

export default storeFactory;