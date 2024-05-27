import axios from 'axios'
import { apiHttp } from '../axiosApi'

async function usersGetList() {
    const result = await apiHttp('get', '/api/v1/users');
    return result
}

// async function usersGet (IdUserLanding) {
//   let result
//   result = await axios.get(
//     'https://as-humedal-api.azurewebsites.net/Users/Get?IdUserLanding=' +
//       IdUserLanding
//   )
//   console.log('GETRESULT: ', result.data.data)
//   return result.data.data
// }

async function createUser(userToCreate) {
    const result = await apiHttp('post', '/api/v1/users', userToCreate);

    console.log('Usuario creado: ', result)
    return result
}

// async function deleteUser (IdUserLanding) {
//   let result
//   result = await axios.delete(
//     'https://as-humedal-api.azurewebsites.net/Users/Delete?IdUserLanding=0' +
//       IdUserLanding
//   )
//   console.log('Usuario Eliminado: ', result)
//   return result
// }

async function updateUser(userToUpdate, id) {
    const result = await apiHttp('patch', '/api/v1/users/updateProfile/' + id, userToUpdate)
    console.log('Usuario Actualizado: ', result)
    return result
}



// async function loginUser(userToLogin) {
//     let result
//     console.log('USUARIO: ', userToLogin)
//     result = await axios
//         .post(
//             'https://as-humedal-api.azurewebsites.net/Users/Authenticate',
//             userToLogin
//         )
//         .then(data => {
//             return data.data
//         })
//         .catch(error => {
//             return error.response.data
//         })
//     console.log('LoginData: ', result)
//     return result
// }

export {
    usersGetList,
    //   loginUser,
    updateUser,
    //   deleteUser,
    createUser,
    //   usersGet,
}

// //  getListUsers(){
// //   console.log("cargando usuarios");
// //   axios
// //     .get("https://as-humedal-api.azurewebsites.net/Users/GetList?Page=1&Rows=123123")
// //     .then((data) => {
// //       this.users = data.data;
// //       console.log(this.users);
// //     })
// //     .catch((e) => {
// //       console.log(e);
// //     });
// // };

// // import { apiHttp } from '../axiosApi.js'
// // import {

// //   userPath, userSave, userLogin,

// // } from '../config/apiRoute.js'

// // export const createUsers = (body) =>
// //   apiHttp('POST', `${userSave}`, body)

// // export const editUsers = (userId, body) =>
// //   apiHttp('PUT', `${userSave}/${userId}`, body)

// // export const getUsers = ({Page,Rows}) =>
// //   apiHttp('GET', `${userPath}`)

// // export const loginApi = ({ email, password, rememberMe }) => {
// //   console.log(email)
// //   console.log(password)
// //   console.log(rememberMe )
// //   return apiHttp('POST', `${userLogin}`, null, {
// //     headers: {
// //        Accept: 'application/json',
// //        'Content-Type': 'application/json',
// //        Authorization: 'Basic ' + btoa(`${email}:${password}:${rememberMe}`),
// //     },
// //   })
// // }
