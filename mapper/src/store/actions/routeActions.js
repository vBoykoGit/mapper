import { routeConstants } from '../constants/routeConstants';

export function addPoint(point) {
    return dispatch => {
        dispatch(addPoint(point))
    };

    function addPoint(point) {
        return {
            type: routeConstants.ADD_POINT,
            point
        }
    }
}

export function changePoint(point) {
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
    return dispatch => {
        dispatch(deletePoint(index))
    };

    function deletePoint(index) {
        return {
            type: routeConstants.DELETE_POINT,
            index
        }
    }
}