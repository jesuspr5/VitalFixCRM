import axios from 'axios'

async function GetList() {
    const result = await apiHttp('get', '/api/v1/inventario');
    console.log('mostrame algo get:', result)
    return result;
}

async function createinventario(inventario) {
    const result = await apiHttp('post', '/api/v1/inventario', inventario)
    console.log('inventario creado: ', result)
    return result
}

async function updateinventario(inventario) {
    let result
    result = await axios.patch(
        `http://localhost:8000/inventario/${inventario.id}`, inventario

    )
    console.log("🚀 ~ updateinventario ~ result:", result)

    return result
}

async function deleteinventario(id) {
    let result
    result = await axios.delete(
        'http://localhost:8000/inventario/' + id
    )
    console.log("🚀 ~ deleteinventario ~ result:", result)

    return result.request.statusText
}

export { GetList, createinventario, updateinventario, deleteinventario }