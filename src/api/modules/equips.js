import axios from 'axios'
import { apiHttp } from '../axiosApi'

async function GetList() {
    const result = await apiHttp('get', '/api/v1/equips');
    console.log('mostrame algo get:', result)
    return result
}
async function createEquips(equips) {
    const result = await apiHttp('post', '/api/v1/equips', equips)
    console.log('equipo creado: ', result)
    return result
}

async function updateEquips(id, equipsToUpdate,) {
    const result = await apiHttp('patch', '/api/v1/equips/' + id, equipsToUpdate)
    console.log('equipo actualizado', result)
    return result
}

async function deleteEquips(id) {
    let result
    result = await apiHttp('delete', '/api/v1/equips/' + id)
    console.log("🚀 ~ deleteEquips ~ result:", result)
    return result
}

export { GetList, createEquips, updateEquips, deleteEquips }