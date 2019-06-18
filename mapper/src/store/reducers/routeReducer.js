import { routeConstants } from '../constants/routeConstants';
import { updateObjectInArray, removeItemFormArray } from '../../otherFuncs/helpers';

const initialState = { points: [] };

const route = (state = initialState, action = {
    type: null
}) => {
    switch (action.type) {
        case routeConstants.ADD_POINT: {
            const { point } = action
            const { points } = state

            return {
                ...state,
                points: [...points, point]
            };
        }
        case routeConstants.CHANGE_POINT: {
            const { point, newCoords } = action
            const { points } = state

            return {
                ...state,
                points: points.updateObjectInArray(points, 0, {})
            }
        }
        case routeConstants.DELETE_POINT: {
            const { index } = action
            const { points } = state

            return {
                loggedIn: true,
                points: points.removeItemFormArray(points, index)
            };
        }
        default:
            return state
    }
}

export default route