import { apiHttp } from '../axiosApi.js'
import { appPath } from '../config/apiRoute.js'

export const getAppToken = () => apiHttp('GET', `${appPath}/token`)

export const getData = path => apiHttp('GET', `${path}`)

export const getDataById = (path, id) => apiHttp('GET', `${path}/${id}`)

export const editData = (path, id, body) =>
  apiHttp('PUT', `${path}/${id}`, body)

export const createData = (path, body) => apiHttp('POST', `${path}`, body)
