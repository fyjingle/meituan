import axios from "axios"
import { HOST_CONFIG } from "./config"

var instance = axios.create({
    baseURL:HOST_CONFIG.host,
    timeout:5000,
    headers: {'X-Requested-With': 'XMLHttpRequest'}
});

export const _get = (url,data,okCallback,errorCallback) =>{
    instance.get( url,{
        params:data
    })
    .then(okCallback)
    .catch(errorCallback);
}

export const _post = (url,data,okCallback,errorCallback) =>{
    instance.post(url,data)
        .then(okCallback)
        .catch(errorCallback);
}