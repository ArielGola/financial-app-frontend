import Axios from 'axios';

export function getToken() {
    return localStorage.getItem('token');
};

export function deleteToken() {
    localStorage.removeItem('token');
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