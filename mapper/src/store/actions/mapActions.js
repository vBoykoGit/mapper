import {
    addGeoObjectOnMap,
    geoObjectFactory,
    removeGeoObjectOnMap
} from '../../otherFuncs/yandexMaps';
import { addPoint, deletePoint, changePoint } from './routeActions';

export function moveMapTo(point) {
    return dispatch => {
        const map = window.yandexMapInstance
        map.panTo(point.geometry.getCoordinates())
    }
}

export function appendPoint(point) {
    return dispatch => {
        dispatch(addPoint(point))
        addGeoObjectOnMap(point)
        dispatch(moveMapTo(point))
    }
}

export function updatePointCoords(point, coords) {
    return async dispatch => {
        const newPoint = await geoObjectFactory({ coords }, dispatch)
        dispatch(changePoint(newPoint))
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