import axios from 'axios'

async function GetList() {
    let result
    result = await axios.get(
        'https://back-vitalfix.onrender.com/api/v1/orders'
    )
    return result.data
}

async function createorder(orders) {
    let result
    result = await axios.post(
        'https://back-vitalfix.onrender.com/api/v1/orders',
        orders
    )
    console.log('orders creada: ', result)
    return result
}

async function updateorder(orders) {
    let result
    result = await axios.patch(
        `https://back-vitalfix.onrender.com/api/v1/orders/${orders.id}`, orders

    )
    console.log("🚀 ~ updateorder ~ result:", result)

    return result
}

async function deleteorder(id) {
    let result
    result = await axios.delete(
        'https://back-vitalfix.onrender.com/api/v1/orders' + id
    )
    console.log("🚀 ~ deleteorder ~ result:", result)

    return result.request.statusText
}

export { GetList, createorder, updateorder, deleteorder }