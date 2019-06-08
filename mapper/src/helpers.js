export const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`
    }));

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

export const reorderArray = (array, fromIndex, toIndex) => {
    var newArray = [...array]
    var element = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, element);
    return newArray;
}