import axios from "axios";
import store from "../redux/store";
import { logout } from "../redux/authSlice";
import { showAlert } from '../redux/uiSlice';


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
            

            if (!error.config.url.includes('auth')) { 
            
               
                store.dispatch(showAlert({
                    message: 'Sua sessão expirou! Você será redirecionado para a tela de login',
                    type: 'warning'
                })); 
            }
            
            setTimeout(() => {
                    store.dispatch(logout()); 
                    window.location.href = '/login';
                }, 3000); 
        }

        return Promise.reject(error);
    }
);

export default api;
