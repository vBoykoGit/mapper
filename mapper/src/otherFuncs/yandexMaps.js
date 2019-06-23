export const suggestView = (elementId = '', onSelect = f => f) => {
    const suggestView = new window.ymaps.SuggestView(elementId, {
        provider: {
            suggest: (request) => window.ymaps.suggest("Москва, " + request)
        }
    });

    document.getElementById(elementId).addEventListener("keypress", async (event) => {
        if (event.key === 'Enter') {
            const { error, geoObject } = await createGeoObjectWithAddress(event.target.value)

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
export const createMap = (mapId = '') => {
    window.yandexMapInstance = new window.ymaps.Map(mapId, {
        center: [55.76, 37.64],
        zoom: 15,
        controls: ['zoomControl', 'geolocationControl']
    });
}

export const addGeoObjectOnMap = (geoObject) => {
    const map = window.yandexMapInstance
    map.geoObjects.add(geoObject)
}

export const removeGeoObjectOnMap = (geoObject) => {
    const map = window.yandexMapInstance
    map.geoObjects.remove(geoObject)
}

const createGeoObjectWithAddress = async (address = '') => {
    const { error, geoObject } = await geocodeWithAddress(address)
    if (geoObject) {
        geoObject.events.add('dragend', function () {
            backwardGeoObjectGeocode(geoObject);
        });
        console.log(geoObject.options.set({ draggable: true }));

    }
    return { error, geoObject }
}

const geocodeWithAddress = (address = '') => {
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

const backwardGeoObjectGeocode = (geoObject) => {
    geoObject.properties.set('iconCaption', 'Search...');
    const coords = geoObject.geometry.getCoordinates()
    window.ymaps.geocode(coords).then(function (res) {
        var firstGeoObject = res.geoObjects.get(0);

        geoObject.properties
            .set({
                iconCaption: [
                    firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                    firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                ].filter(Boolean).join(', '),
                balloonContent: firstGeoObject.getAddressLine()
            });
    });
}

const addressFromGeoObject = (geoObject = {}) => {
    const address = [geoObject.getCountry(), geoObject.getAddressLine()].join(', ')
    const shortAddress = [geoObject.getThoroughfare(), geoObject.getPremiseNumber(), geoObject.getPremise()].join(' ')

    return { address, shortAddress }
}