import { routeConstants } from '../constants/routeConstants';
import { addGeoObjectOnMap, removeGeoObjectOnMap } from '../../otherFuncs/yandexMaps';
import { moveMapTo } from './mapActions';

export function addPoint(point = {}) {
    return dispatch => {
        addGeoObjectOnMap(point)
        dispatch(addPoint(point))
        dispatch(moveMapTo(point))
    };

    function addPoint(point) {
        return {
            type: routeConstants.ADD_POINT,
            point
        }
    }
}

export function changePoint(point = {}) {
    return dispatch => {
        dispatch(changePoint(point))
    };

    function changePoint(point) {
        return {
            type: routeConstants.CHANGE_POINT,
            point
        }
    }
}

export function deletePoint(index = NaN) {
    return (dispatch, getState) => {
        const { route } = getState()
        const { points } = route
        removeGeoObjectOnMap(points[index])
        dispatch(deletePoint(index))
    };

    function deletePoint(index) {
        return {
            type: routeConstants.DELETE_POINT,
            index
        }
    }
}