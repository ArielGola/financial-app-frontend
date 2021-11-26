import Axios from 'axios';


export function getToken() {
    let token = document.cookie.split('=')[1];
    return token;
};


export function deleteToken() {
    let date = new Date();
    date.setTime(date.getTime() -10);
    document.cookie = `token=; expires=${date.toGMTString()}`;
};


export function initInterceptor() {
    Axios.interceptors.request.use(function(config) {
        const token = getToken();

        if (token) {
            config.headers.Authorization = `bearer ${token}`;
        }

        return config;
    });

    Axios.interceptors.response.use(
        function(response) {
            return response;
        },
        function(error) {
            return error;
        }
    )
};