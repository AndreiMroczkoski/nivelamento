import axios from "axios";
import store from "../redux/store";
import { logout } from "../redux/authSlice";


const api = axios.create({
    baseURL: 'http://localhost:8080'
});

api.interceptors.request.use((config) => {
    const token = store.getState().auth.token;

    if(token && !config.url.includes('/login')){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})


api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            store.dispatch(logout());
            //por enquanto ta com o alert normal do java, quando implementar o meu component alert pelo redux arrumo aqui.
            alert('Token expirado. Você será redirecionado para o login.'); 
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
