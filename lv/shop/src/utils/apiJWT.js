import axios from 'axios';
import * as config from './../constans/configapi';
export default function callApiJwt(endpoint, method = 'GET', body,header){
    return axios({
        method : method,
        url: `${config.API_URL}${endpoint}`,
        data:body,
        headers:header
    })
    .catch( err =>{
        console.log(err);
    })
}