export const suggestView = (elementId = '', onSelect = f => f) => {
    const suggestView = new window.ymaps.SuggestView(elementId, {
        provider: {
            suggest: (request) => window.ymaps.suggest("Москва, " + request)
        }
    });

    document.getElementById(elementId).addEventListener("keypress", async (event) => {
        if (event.key === 'Enter') {
            const { error, geoObject } = await geocode(event.target.value)

            if (error) {
                onSelect({ error })
                return
            }
            const address = addressFromGeoObject(geoObject)
            onSelect({
                geoObject,
                ...address
            })
            event.target.value = ''
        }
    })
}
export const createMap = (mapId = '') => {
    window.yandexMapInstance = new window.ymaps.Map(mapId, {
        center: [55.76, 37.64],
        zoom: 15,
        controls: ['zoomControl', 'geolocationControl']
    });
}

export const addGeoObjectOnMap = (geoObject) => {
    const map = window.yandexMapInstance
    const bounds = geoObject.properties.get('boundedBy')
    // const mapState = window.ymaps.util.bounds.getCenterAndZoom(
    //     bounds,
    //     [map.width(), map.height()]
    // )
    map.geoObjects.add(geoObject)
}

const geocode = (address = '') => {
    return new Promise(resolve => {
        window.ymaps.geocode(address).then(function (res) {
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

const addressFromGeoObject = (geoObject = {}) => {
    const address = [geoObject.getCountry(), geoObject.getAddressLine()].join(', ')
    const shortAddress = [geoObject.getThoroughfare(), geoObject.getPremiseNumber(), geoObject.getPremise()].join(' ')

    return { address, shortAddress }
}