
import axios from "axios";
import store from "../redux/store";

const api = axios.create({
    baseURL: 'http://localhost:8080'
});


api.interceptors.request.use((config) => {
    debugger;
    const token = store.getState().auth.token;

    if(token && !config.url.includes('/login')){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

////criar interceptor response para erro 401 (token expirado)

    


export default api;