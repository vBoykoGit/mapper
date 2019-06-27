import { routeConstants } from '../constants/routeConstants';
import {
    updateGeoObjects,
    removeGeoObject
} from '../../otherFuncs/helpers';
import { removeGeoObjectOnMap } from '../../otherFuncs/yandexMaps';

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
            const { point } = action
            const { points } = state

            return {
                ...state,
                points: updateGeoObjects(points, point)
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
        default:
            return state
    }
}

export default route