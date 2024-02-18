// import axios from 'axios'

// async function investigationGetList (Page, Rows) {
//   let result
//   result = await axios.get(
//     'https://as-humedal-api.azurewebsites.net/Researchs/GetList?Page=' +
//       Page +
//       '&Rows=' +
//       Rows
//   )
//   return result.data.data.items
// }

// async function investigationGet (idinvestigation) {
//   let result
//   result = await axios.get(
//     'https://as-humedal-api.azurewebsites.net/Researchs/Get?idResearchLanding=' +
//       idinvestigation
//   )
//   console.log('GETRESULT: ', result.data.data)
//   return result.data.data
// }
// async function createinvestigation (investigationToCreate) {
//   let result
//   result = await axios.post(
//     'https://as-humedal-api.azurewebsites.net/Researchs/Create',
//     investigationToCreate
//   )
//   console.log('investigacion creada con exito: ', result)
//   return result
// }

// // export const createpublications = (body) =>
// // apiHttp('POST', `https://as-humedal-api.azurewebsites.net/Publications/Create`, body, {
// //   'Content-Type': 'multipart/form-data',
// //   Authorization: 'Bearer ' + `${token}`,
// // })

// async function deleteinvestigation (idResearchLanding) {
//   let result
//   result = await axios.delete(
//     'https://as-humedal-api.azurewebsites.net/Researchs/Delete?IdResearchLanding=' +
//       idResearchLanding
//   )
//   console.log('investigacion Eliminada con exito: ', result)
//   return result.data.data
// }

// async function updateinvestigation (publicationsToUpdate) {
//   let result
//   result = await axios.put(
//     'https://as-humedal-api.azurewebsites.net/Researchs/Update',
//     publicationsToUpdate
//   )
//   console.log('investigacion Actualizada con exito: ', result)
//   return result
// }

// async function uploadpdf (pdf) {
//   let result
//   result = await axios
//     .post('https://as-humedal-api.azurewebsites.net/Researchs/Upload', pdf)
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
//   investigationGetList,
//   investigationGet,
//   createinvestigation,
//   deleteinvestigation,
//   updateinvestigation,
//   uploadpdf,
// }
