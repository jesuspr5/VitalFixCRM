import axios from 'axios'
import { apiHttp } from '../axiosApi'

async function promotionsGetList () {
    const token = localStorage.getItem("token")
    console.log(token)
    const result = await apiHttp('get', '/api/v1/promotions', null, { headers: { Authorization: `Bearer ${token}` } })
    return result
}

export { promotionsGetList }