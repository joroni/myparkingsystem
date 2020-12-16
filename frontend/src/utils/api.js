
import axios from 'axios'

export function availableLots() {
    return axios.get('/lots').then(function (response) {
       return response.data;
    })
 }