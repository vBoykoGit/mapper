import { routeConstants } from '../constants/routeConstants';
import { addGeoObjectOnMap } from '../../otherFuncs/yandexMaps';

export function moveMapTo(point) {
    return dispatch => {
        const map = window.yandexMapInstance
        map.panTo(point.geometry.getCoordinates())
    }
}