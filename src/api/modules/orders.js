import axios from 'axios'
import { apiHttp } from '../axiosApi'

async function GetList() {
    const result = await apiHttp('get', '/api/v1/orders');
    return result;
}

async function createorder(orders) {
    const result = await apiHttp('post', '/api/v1/orders', orders)
    console.log('orders creada: ', result)
    return result
}

async function updateorder(orders) {
    const result = await apiHttp('patch', `/api/v1/orders/${orders.id}`, orders)
    return result
}

async function deleteorder(id) {
    const result = await apiHttp('delete', '/api/v1/requests/' + id)
    console.log("🚀 ~ deleteorder ~ result:", result)

    return result
}

export { GetList, createorder, updateorder, deleteorder }