import axios from 'axios'

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
    const result = await apiHttp('delete', '/api/v1/orders/' + id)
    console.log("🚀 ~ deleteorder ~ result:", result)

    return result.request.statusText
}

export { GetList, createorder, updateorder, deleteorder }