import axios from 'axios'

async function GetList() {
    let result
    result = await axios.get(
        'https://back-vitalfix.onrender.com/api/v1/requests/'
    )
    return result.data
}

async function createrequest(request) {
    let result
    result = await axios.post(
        'https://back-vitalfix.onrender.com/api/v1/requests/',
        request
    )
    console.log('Solicitud creada: ', result)
    return result
}

async function updaterequest(request) {
    let result
    result = await axios.patch(
        `https://back-vitalfix.onrender.com/api/v1/requests/${request.id}`, request

    )
    console.log("🚀 ~ updaterequest ~ result:", result)

    return result
}

async function deleterequest(id) {
    let result
    result = await axios.delete(
        'https://back-vitalfix.onrender.com/api/v1/requests/' + id
    )
    console.log("🚀 ~ deleterequest ~ result:", result)

    return result.request.statusText
}

export { GetList, createrequest, updaterequest, deleterequest }