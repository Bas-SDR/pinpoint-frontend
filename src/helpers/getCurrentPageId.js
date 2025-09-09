function getCurrentEntity(array, id, idKey = "id") {
    if (!array || id == null) return null;
    return array.find(item => item[idKey] === Number(id)) || null;
}

export default getCurrentEntity;