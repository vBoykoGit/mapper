import { routeConstants } from '../constants/routeConstants';
import {
    removeGeoObject,
    reorderArray,
    replaceGeoObject
} from '../../otherFuncs/helpers';

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
        case routeConstants.REPLACE_POINT: {
            const { oldPoint, newPoint } = action
            const { points } = state

            return {
                ...state,
                points: replaceGeoObject(points, oldPoint, newPoint)
            }
        }
        case routeConstants.DELETE_POINT: {
            const { index } = action
            const { points } = state

            return {
                ...state,
                points: removeGeoObject(points, index)
            };
        }
        case routeConstants.REORDER_POINTS: {
            const { fromIndex, toIndex } = action
            const { points } = state

            return {
                ...state,
                points: reorderArray(points, fromIndex, toIndex)
            };
        }
        case routeConstants.SET_ROUTE: {
            const { route } = action

            return {
                ...state,
                routeObject: route
            };
        }
        default:
            return state
    }
}

export default route