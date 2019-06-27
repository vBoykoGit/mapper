import { changePoint } from '../store/actions/routeActions';
import { v1 as uuidv1 } from 'uuid';
import { updatePointCoords } from '../store/actions/mapActions';

export const suggestView = (elementId = '', onSelect = f => f, dispatch) => {
    const suggestView = new window.ymaps.SuggestView(elementId, {
        provider: {
            suggest: (request) => window.ymaps.suggest("Москва, " + request)
        }
    });

    document.getElementById(elementId).addEventListener("keypress", async (event) => {
        if (event.key === 'Enter') {
            const geoObject = await geoObjectFactory({ address: event.target.value }, dispatch)
            const { error } = geoObject
            if (error) {
                onSelect({ error })
                return
            }
            onSelect({
                geoObject
            })
            event.target.value = ''
        }
    })
}
export const createMap = (mapId = '') =>
    window.yandexMapInstance = new window.ymaps.Map(mapId, {
        center: [55.76, 37.64],
        zoom: 15,
        controls: ['zoomControl', 'geolocationControl']
    })

export const addGeoObjectOnMap = (geoObject) => {
    const map = window.yandexMapInstance
    map.geoObjects.add(geoObject)
}

export const removeGeoObjectOnMap = (geoObject) => {
    const map = window.yandexMapInstance
    map.geoObjects.remove(geoObject)
}

export const geoObjectFactory = async ({ coords, address }, dispatch) => {
    let result

    if (address) {
        result = await geocodeWithAddress(address)
    } else if (coords) {
        result = await geocodeWithCoords(coords)
    }
    const { geoObject } = result
    if (result.error) {
        return result
    }
    return configureGeoObjectWithDispatch(geoObject, dispatch)
}

const configureGeoObjectWithDispatch = async (geoObject = {}, dispatch) => {
    geoObject.options.set({ draggable: true })
    geoObject.properties.set('id', uuidv1())

    geoObject.events.add('dragend', async () => {

        const coords = geoObject.geometry.getCoordinates()
        dispatch(updatePointCoords(geoObject, coords))
    });
    return geoObject
}

const geocodeWithAddress = (address = '') => {
    return new Promise(resolve => {
        window.ymaps.geocode(address).then((res) => {
            const geoObject = res.geoObjects.get(0)
            let error
            if (geoObject) {
                switch (geoObject.properties.get('metaDataProperty.GeocoderMetaData.precision')) {
                    case 'exact':
                        break;
                    case 'number':
                    case 'near':
                    case 'range':
                        error = 'Уточните номер дома';
                        break;
                    case 'street':
                        error = 'Уточните номер дома';
                        break;
                    case 'other':
                    default:
                        error = 'Уточните адрес';
                }
            } else {
                error = 'Уточните адрес';
            }

            if (error) {
                resolve({ error })
            }
            resolve({ geoObject })
        })
    })
}

const geocodeWithCoords = (coords) => {
    return new Promise(resolve =>
        window.ymaps.geocode(coords).then((res) =>
            resolve({ geoObject: res.geoObjects.get(0) })
        )
    )
}

export const addressFromGeoObject = (geoObject = {}) => {
    const address = [geoObject.getCountry(), geoObject.getAddressLine()].join(', ')
    const shortAddress = [geoObject.getThoroughfare(), geoObject.getPremiseNumber(), geoObject.getPremise()].join(' ')

    return { address, shortAddress }
}