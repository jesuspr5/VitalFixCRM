import axios from 'axios'

async function GetList() {
    let result
    result = await axios.get(
        'http://localhost:3000/inventario'
    )
    return result.data
}

async function createinventario(inventario) {
    let result
    result = await axios.post(
        'http://localhost:3000/inventario',
        inventario
    )
    console.log('inventario creado: ', result)
    return result
}

async function updateinventario(inventario) {
    let result
    result = await axios.patch(
        `http://localhost:3000/inventario/${inventario.id}`, inventario

    )
    console.log("🚀 ~ updateinventario ~ result:", result)

    return result
}

async function deleteinventario(id) {
    let result
    result = await axios.delete(
        'http://localhost:3000/inventario/' + id
    )
    console.log("🚀 ~ deleteinventario ~ result:", result)

    return result.request.statusText
}

export { GetList, createinventario, updateinventario, deleteinventario }