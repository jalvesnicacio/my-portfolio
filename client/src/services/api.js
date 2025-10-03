import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001",
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptador para adicionar o token JWT a cada requisição
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // ou sessionStorage se preferir

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Interceptador para lidar com erros de resposta (ex: token expirado)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login"; // redireciona para a tela de login
        }
        return Promise.reject(error);
    }
);


export default api;