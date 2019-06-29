export const removeItemFormArray = (array, removeIndex) =>
    array.filter((item, index) => index !== removeIndex)

export const updateObjectInArray = (array, updateIndex, newItem) =>
    array.map((item, index) => index !== updateIndex ?
        item :
        {
            ...item,
            ...newItem
        }
    )

export const replaceGeoObject = (array, oldGeoObject, newGeoObject) =>
    array.map((geoObject) => {
        return geoObject.properties.get('id') !== oldGeoObject.properties.get('id') ? geoObject : { ...newGeoObject }
    })

export const updateGeoObject = (array, newGeoObject) =>
    array.map((geoObject) => {
        return geoObject.properties.get('id') !== newGeoObject.properties.get('id') ? geoObject : { ...newGeoObject }
    })
export const removeGeoObject = (array, removeGeoObject) =>
    array.filter((geoObject) =>
        geoObject.properties.get('id') === removeGeoObject.properties.get('id'))

export const reorderArray = (array, fromIndex, toIndex) => {
    var newArray = [...array]
    var [element] = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, element);
    return newArray;
}