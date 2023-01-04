import axios from "axios";


async function blogsGetList(Page,Rows){
  let result;
  result = await axios.get("https://as-humedal-api.azurewebsites.net/Blogs/GetList?Page="+Page+"&Rows="+Rows)
  return result.data.data.items
}

async function blogsGetListCatType(Page,Rows,IdCatType){
    let result;
    result = await axios.get("https://as-humedal-api.azurewebsites.net/Blogs/GetListCat?Page="+Page+"&Rows="+Rows+"&IdCatTyp="+IdCatType)
    return result.data.data.items
  }
  async function blogsGetListText(Page,Rows,Text){
    let result;
    result = await axios.get("https://as-humedal-api.azurewebsites.net/Blogs/GetListText?Page="+Page+"&Rows="+Rows+"&IdCatTyp="+Text)
    return result.data.data.items
  }

async function blogsGet(Idblog){
  let result;
  result = await axios.get("https://as-humedal-api.azurewebsites.net/Blogs/Get?idBLogLanding="+blog)
  console.log('GETRESULT: ', result.data.data)
  return result.data.data
}
async function createblog( blogToCreate ){
  let result;
    result = await axios.post("https://as-humedal-api.azurewebsites.net/Blogs/Create",blogToCreate)
    console.log('Usuario creado: ', result)
    return result

}

async function deleteblog(Idblog){
  let result;
    result = await axios.delete("https://as-humedal-api.azurewebsites.net/Blogs/Delete?IdBlogLanding="+ IdblogLanding)
    console.log('Usuario Eliminado: ', result)
    return result

}

async function updateblog( blogToUpdate ){
  let result;
    result = await axios.post("https://as-humedal-api.azurewebsites.net/Blogs/Update", blogToUpdate)
    console.log('Usuario Actualizado: ', result)
    return result

}
async function uploadimg(img){
  let result ;
 result=await axios.post("https://as-humedal-api.azurewebsites.net/Blogs/Upload",img) 
}


export { 
  blogsGetList,
  blogsGetListCatType,
  blogsGetListText,
  updateblog,
  deleteblog,
  createblog,
  blogsGet,
  uploadimg
}
