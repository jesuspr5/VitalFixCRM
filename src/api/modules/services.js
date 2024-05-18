import axios from 'axios'

async function GetList() {
    const result = await apiHttp('get', '/api/v1/services');
    console.log('mostrame algo get:', result)
    return result;
}

async function createservices(services) {
    const result = await apiHttp('post', '/api/v1/services', services)
    console.log('services creado: ', result)
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