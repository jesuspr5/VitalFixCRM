import axios from 'axios'
import { apiHttp } from '../axiosApi'

async function promotionsGetList() {
    const result = await apiHttp('get', '/api/v1/promotions');
    return result;
}

export { promotionsGetList };
