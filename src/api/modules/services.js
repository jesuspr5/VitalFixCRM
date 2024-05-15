import axios from 'axios'

async function GetList() {
    let result
    result = await axios.get(
        'https://back-vitalfix.onrender.com/api/v1/services'
    )
    return result.data
}

async function createservices(services) {
    let result
    result = await axios.post(
        'https://back-vitalfix.onrender.com/api/v1/services',
        services
    )
    console.log('Servicio creado: ', result)
    return result
}

async function updateservices(services) {
    let result
    result = await axios.patch(
        `https://back-vitalfix.onrender.com/api/v1/services/${services.id}`, services

    )
    console.log("🚀 ~ updateservices ~ result:", result)

    return result
}

async function deleteservices(id) {
    let result
    result = await axios.delete(
        'https://back-vitalfix.onrender.com/api/v1/services/' + id
    )
    console.log("🚀 ~ deleteservices ~ result:", result)

    return result.request.statusText
}

export { GetList, createservices, updateservices, deleteservices }