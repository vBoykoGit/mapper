import {
    addGeoObjectOnMap,
    geoObjectFactory,
    removeGeoObjectOnMap,
    showGeoObject,
    drawRoute
} from '../../otherFuncs/yandexMaps';
import { addPoint, deletePoint, updateRoute, replacePoint } from './routeActions';

export function moveMapTo(point) {
    return dispatch => {
        showGeoObject(point)
    }
}

export function appendPoint(point) {
    return dispatch => {
        addGeoObjectOnMap(point)
        dispatch(addPoint(point))
        dispatch(moveMapTo(point))
    }
}

export function updatePointCoords(point, coords) {
    return async dispatch => {
        const newPoint = await geoObjectFactory({ coords }, dispatch)
        dispatch(replacePoint(point, newPoint))
        removeGeoObjectOnMap(point)
        addGeoObjectOnMap(newPoint)
    }
}

export function removePoint(point) {
    return dispatch => {
        dispatch(deletePoint(point))
        removeGeoObjectOnMap(point)
    }
}

export function redrawRoute() {
    return (dispatch, getState) => {
        const { route } = getState()
        const { routeObject, points } = route

        removeGeoObjectOnMap(routeObject)
        const newRoute = drawRoute(points)

        dispatch(updateRoute(newRoute))
    }
}