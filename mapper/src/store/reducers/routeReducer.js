import { executorConstants } from '../constants/executorConstants';

const initialState = { isExecuting: false };

const script = (state = initialState, action = {
    type: null
}) => {
    switch (action.type) {
        case executorConstants.START_REQUEST:
            return state;
        case executorConstants.START_SUCCESS:
            return {
                ...state,
                isExecuting: true
            }
        case executorConstants.STOP_REQUEST:
            return {
                loggedIn: true,
                userInfo: action.user
            };
        default:
            return state
    }
}

export default script