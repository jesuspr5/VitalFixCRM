// import axios from 'axios'

// async function blogsGetList (Page, Rows) {
//   let result
//   result = await axios.get(
//     'https://as-humedal-api.azurewebsites.net/Blogs/GetList?Page=' +
//       Page +
//       '&Rows=' +
//       Rows
//   )
//   return result.data.data.items
// }

// async function blogsGetListCatType (Page, Rows, IdCatTyp) {
//   let result
//   result = await axios.get(
//     'https://as-humedal-api.azurewebsites.net/Blogs/GetListCat?Page=' +
//       Page +
//       '&Rows=' +
//       Rows +
//       '&IdCatTyp=' +
//       IdCatTyp
//   )
//   return result.data.data.items
// }
// async function blogsGetListText (Page, Rows, Text) {
//   let result
//   result = await axios.get(
//     'https://as-humedal-api.azurewebsites.net/Blogs/GetListText?Page=' +
//       Page +
//       '&Rows=' +
//       Rows +
//       '&IdCatType=' +
//       Text
//   )
//   return result.data.data.items
// }

// async function blogsGet (Page, Rows, Id) {
//   let result
//   result = await axios.get(
//     'https://as-humedal-api.azurewebsites.net/Blogs/Get?Page=' +
//       Page +
//       '&Rows=' +
//       Rows +
//       '&idBLogLanding=' +
//       Id
//   )
//   console.log('GETRESULT: ', result.data.data)
//   return result.data.data
// }
// async function createblog (blogToCreate) {
//   let result
//   result = await axios.post(
//     'https://as-humedal-api.azurewebsites.net/Blogs/Create',
//     blogToCreate
//   )
//   console.log('Blog creado: ', result)
//   return result
// }

// async function deleteblog (IdBlogLanding) {
//   let result
//   result = await axios.delete(
//     'https://as-humedal-api.azurewebsites.net/Blogs/Delete?IdBlogLanding=' +
//       IdBlogLanding
//   )
//   console.log('Blog Eliminado con exito: ', result)
//   return result.data.data
// }

// async function updateblog (blogToUpdate) {
//   let result
//   result = await axios.put(
//     'https://as-humedal-api.azurewebsites.net/Blogs/Update',
//     blogToUpdate
//   )
//   console.log('Blog Actualizado: ', result)
//   return result
// }
// async function uploadimg (img) {
//   let result
//   result = await axios
//     .post('https://as-humedal-api.azurewebsites.net/Blogs/Upload', img)
//     .then(data => {
//       return data.data.data
//     })
//     .catch(error => {
//       return error.response.data
//     })
//   console.log('url: ', result)
//   return result
// }

// function url () {
//   return 'https://as-humedal-api.azurewebsites.net/Blogs/Upload'
// }

// //  function uploadimg() {
// //   return "https://as-humedal-api.azurewebsites.net/Blogs/Upload";
// // }

// // export const createCharityOrg = (body) =>
// //   apiHttp('POST', `${charityOrgPathRoot}`, body, {
// //     'Content-Type': 'multipart/form-data',
// //     Authorization: 'Bearer ' + `${token}`,
// // })

// export {
//   blogsGetList,
//   blogsGetListCatType,
//   blogsGetListText,
//   updateblog,
//   deleteblog,
//   createblog,
//   blogsGet,
//   uploadimg,
//   url,
// }
