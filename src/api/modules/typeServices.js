import axios from 'axios'
import { apiHttp } from '../axiosApi'

async function GetList() {
    const result = await apiHttp('get', '/api/v1/');
    console.log('mostrame algo get:', result)
    return result;
}

async function createTypeServicio(typeService) {
    const result = await apiHttp('post', '/api/v1/', typeService)
    console.log('typeService creado: ', result)
    return result
}

async function updateTypeService(typeServiceToUpdate, id) {
    
    const result = await apiHttp('patch', '/api/v1/promotions/' + id, typeServiceToUpdate)
    console.log('Promocion Actualizada: ', result)
    return result
}

async function deleteTypeService(id) {
    const result = await apiHttp('delete', '/api/v1/' + id)
    console.log("🚀 ~ deleteservices ~ result:", result)

    return result.request.statusText
}

export { GetList, createTypeServicio, updateTypeService, deleteTypeService }
