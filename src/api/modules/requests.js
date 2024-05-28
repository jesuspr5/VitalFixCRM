import axios from 'axios'
import { apiHttp } from '../axiosApi'

async function getlistRequest() {
    const result = await apiHttp('get', '/api/v1/requests');
    return result;
}


async function asignarTecnico(idreq, idtec) {
    const result = await apiHttp('patch', `/api/v1/requests/setTecnico/${idreq}`, idtec);
    return result;

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

async function cancelRequest(id) {

    const result = await apiHttp('patch', `/api/v1/requests/cancelarRequest/${id}`);
    console.log("🚀 ~ cancelRequest ~ result:", result)
    return result;

}



export { getlistRequest, createrequest, updaterequest, cancelRequest, asignarTecnico }