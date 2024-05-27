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

async function deleteUser(id) {
    let result
    result = await apiHttp('delete', '/api/v1/users/' + id)
    console.log('Usuario Eliminado: ', result)
    return result
}


async function updateUser(id, userToUpdate) {
    const result = await apiHttp('patch', '/api/v1/users/updateProfile/' + id, userToUpdate)
    console.log('Usuario Actualizado: ', result)
    return result
}


export {
    usersGetList,
    //   loginUser,
    updateUser,
    deleteUser,
    createUser,
    //   usersGet,
}
