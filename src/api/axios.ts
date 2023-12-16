import axios from 'axios'

export const authFetch = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
})

authFetch.interceptors.request.use(
    (config) => {
        config.headers["Content-Type"] = "application/json"
        config.headers["Accept"] = "application/json";
        config.headers.Authorization
            = `Bearer ${localStorage.getItem("rb-access-token")}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
)
