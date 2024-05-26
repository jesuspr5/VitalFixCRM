import axios from 'axios'
import { apiHttp } from '../axiosApi'
import { getlistRequest } from './requests'

async function GetList() {
    const result = await apiHttp('get', '/api/v1/claims');
    return result;
}


async function createClaim(claim) {
    const result = await apiHttp('post', '/api/v1/claims', typeService)
    console.log('claim creado: ', result)
    return result
}

async function updateClaim(claim, id) {

    const result = await apiHttp('patch', '/api/v1/claims/' + id, claim)
    console.log('claim Actualizada: ', result)
    return result
}

async function deleteClaim(id) {
    const result = await apiHttp('delete', '/api/v1/claims/' + id)
    console.log("🚀 ~ delete claim ~ result:", result)

    return result.request.statusText
}

export { GetList }