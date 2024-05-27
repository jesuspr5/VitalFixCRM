import axios from 'axios'
import { apiHttp } from '../axiosApi'

async function GetList() {
    const result = await apiHttp('get', '/api/v1/suggestions');
    return result;
}
async function deleteSuggestions(id) {
    let result
    result = await apiHttp('delete', '/api/v1/suggestions/' + id)
    console.log("🚀 ~ delete suggestions ~ result:", result)
    return result.status

}

export { GetList, deleteSuggestions }