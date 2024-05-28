import axios from 'axios'
import { apiHttp } from '../axiosApi'

async function GetList() {
    const result = await apiHttp('get', '/api/v1/typeservice');
    return result;
}

async function createTypeServicio(typeService) {
    const result = await apiHttp('post', '/api/v1/typeservice', typeService)
    console.log('typeService creado: ', result)
    return result
}

async function updateTypeService(typeServiceToUpdate, id) {

    const result = await apiHttp('patch', '/api/v1/typeservice/' + id, typeServiceToUpdate)
    console.log('type service Actualizada: ', result)
    return result
}

async function deleteTypeService(id) {
    let result
    result = await apiHttp('delete', '/api/v1/typeservice/' + id)
    console.log("🚀 ~ delete typeservice ~ result:", result)
    return result
}

export { GetList, createTypeServicio, updateTypeService, deleteTypeService }
