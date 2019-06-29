import { routeConstants } from '../constants/routeConstants';
import { redrawRoute } from './mapActions';

export function addPoint(point = {}) {
    return dispatch => {
        dispatch(addPoint(point))
        dispatch(redrawRoute())
    };

    function addPoint(point) {
        return {
            type: routeConstants.ADD_POINT,
            point
        }
    }
}

export function replacePoint(oldPoint = {}, newPoint = {}) {
    return dispatch => {
        dispatch(replacePoint(oldPoint, newPoint))
        dispatch(redrawRoute())
    };

    function replacePoint(oldPoint, newPoint) {
        return {
            type: routeConstants.REPLACE_POINT,
            oldPoint,
            newPoint
        }
    }
}

export function deletePoint(point = {}) {
    return (dispatch, getState) => {
        dispatch(deletePoint(point))
        dispatch(redrawRoute())
    };

    function deletePoint(index) {
        return {
            type: routeConstants.DELETE_POINT,
            index
        }
    }
}

export function reorderPoints(fromIndex, toIndex) {
    return dispatch => {
        dispatch(reorderPoints(fromIndex, toIndex))
        dispatch(redrawRoute())
    };

    function reorderPoints(fromIndex, toIndex) {
        return {
            type: routeConstants.REORDER_POINTS,
            fromIndex,
            toIndex
        }
    }
}

export function updateRoute(route = {}) {
    return dispatch => {
        dispatch(setRoute(route))
    };

    function setRoute(route) {
        return {
            type: routeConstants.SET_ROUTE,
            route
        }
    }
}