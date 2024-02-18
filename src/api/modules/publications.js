// import axios from 'axios'

// async function publicationsGetList (Page, Rows) {
//   let result
//   result = await axios.get(
//     'https://as-humedal-api.azurewebsites.net/Publications/GetList?Page=' +
//       Page +
//       '&Rows=' +
//       Rows
//   )
//   return result.data.data.items
// }

// async function publicationsGet (idPublications) {
//   let result
//   result = await axios.get(
//     'https://as-humedal-api.azurewebsites.net/Publications/Get?idPublicationsLanding=' +
//     idPublications
//   )
//   console.log('GETRESULT: ', result.data.data)
//   return result.data.data
// }
// async function createpublications (publicationsToCreate) {
//   let result
//   result = await axios.post(
//     'https://as-humedal-api.azurewebsites.net/Publications/Create',
//     publicationsToCreate
//   )
//   console.log('Publicacion creada con exito: ', result)
//   return result
// }

// // export const createpublications = (body) =>
// // apiHttp('POST', `https://as-humedal-api.azurewebsites.net/Publications/Create`, body, {
// //   'Content-Type': 'multipart/form-data',
// //   Authorization: 'Bearer ' + `${token}`,
// // })

// async function deletepublications (IdPublicationsLanding) {
//   let result
//   result = await axios.delete(
//     'https://as-humedal-api.azurewebsites.net/Publications/Delete?IdPublicationsLanding=' +
//       IdPublicationsLanding
//   )
//   console.log('publicacion Eliminada con exito: ', result)
//   return result.data.data
// }

// async function updatepublications (publicationsToUpdate) {
//   let result
//   result = await axios.put(
//     'https://as-humedal-api.azurewebsites.net/Publications/Update',
//     publicationsToUpdate
//   )
//   console.log('publicacion Actualizada con exito: ', result)
//   return result
// }
// async function uploadpdf (pdf) {
//   let result
//   result = await axios
//     .post('https://as-humedal-api.azurewebsites.net/Publications/Upload', pdf)
//     .then(data => {
//       return data.data.data
//     })
//     .catch(error => {
//       return error.response.data
//     })
//   console.log('url: ', result)
//   return result
// }

// export {
//   publicationsGetList,
//   publicationsGet,
//   createpublications,
//   deletepublications,
//   updatepublications,
//   uploadpdf,
// }
