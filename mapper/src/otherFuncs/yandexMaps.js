export const suggestView = (elementId = '', onSelect = f => f) => {
    const suggestView = new window.ymaps.SuggestView(elementId, {
        provider: {
            suggest: (request) => window.ymaps.suggest("Москва, " + request)
        }
    });
    suggestView.events.add('select', async (event) => {
        const { error, geoObject } = await geocode(event.get('item').value)

        if (error) {
            onSelect({ error })
            return
        }
        const address = addressFromGeoObject(geoObject)
        onSelect({
            geoObject,
            ...address
        })
    })
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

            console.log(error, geoObject);

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