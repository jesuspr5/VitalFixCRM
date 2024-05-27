import axios from 'axios'
import { apiHttp } from '../axiosApi'

async function promotionsGetList() {
    const result = await apiHttp('get', '/api/v1/promotions');
    console.log('mostrame algo get:', result)
    return result;
}

async function createpromotions(promotion) {
    const result = await apiHttp('post', '/api/v1/promotions', promotion)
    console.log('promotion creado: ', result)
    return result
}

async function updatepromotions(promotionToUpdate, id) {
    const result = await apiHttp('patch', '/api/v1/promotions/' + id, promotionToUpdate)
    console.log('Promocion Actualizada: ', result)
    return result
}

async function deletepromotions(id) {
    let result
    result = await apiHttp('delete', '/api/v1/promotions/' + id)
    console.log("🚀 ~ deleteservices ~ result:", result)
    return result.status
}

export { promotionsGetList, createpromotions, updatepromotions, deletepromotions }
