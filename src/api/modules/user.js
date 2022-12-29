import { apiHttp } from '../axiosApi.js'
import {

  userPath, userSave, userLogin,

} from '../config/apiRoute.js'

export const createUsers = (body) =>
  apiHttp('POST', `${userSave}`, body)

export const editUsers = (userId, body) =>
  apiHttp('PUT', `${userSave}/${userId}`, body)

export const getUsers = () =>
  apiHttp('GET', `${userPath}`)

export const loginApi = ({ email, password }) => {
  console.log(email)
  console.log(password)
  return apiHttp('GET', `${userLogin}`, null, {
    headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
       Authorization: 'Basic ' + btoa(`${email}:${password}`),
    },
  })
}
