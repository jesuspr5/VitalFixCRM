import axios from 'axios'
import { apiHttp } from '../axiosApi'

async function GetList() {
    const result = await apiHttp('get', '/api/v1/services');
    return result;
}

async function GetListtype() {
    const result = await apiHttp('get', '/api/v1/typeservice');
    return result;
}

async function createservices(services) {
    const result = await apiHttp('post', '/api/v1/services', services)
    console.log('services creado: ', result)
    return result
}

async function updateservices(serviceToUpdate, id) {
    const result = await apiHttp('patch', '/api/v1/services/' + id, serviceToUpdate)
    console.log('Servicio actualizado', result)
    return result
}

async function deleteservices(id) {
    const result = await apiHttp('delete', '/api/v1/services/' + id)
    console.log('Servicio eliminado', result)
    return result
}

export { GetList, createservices, updateservices, deleteservices, GetListtype }