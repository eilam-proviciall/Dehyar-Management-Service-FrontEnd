import axios from 'axios'
import { toast } from 'react-toastify';

// ایجاد یک نمونه از Axios
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

api.interceptors.request.use(
    (config) => {
        // بررسی نیاز به احراز هویت
        if (config.requiresAuth) {
            const token = window.localStorage.getItem('token');
            console.log("Token => ", token);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                toast.error('احراز هویت موفقیت آمیز نبود', { position: "top-center" });
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.data.errors) {
                const errors = error.response.data.errors;
                Object.keys(errors).forEach((key) => {
                    errors[key].forEach((message) => {
                        toast.error(message);
                    });
                });
            } else if (error.response.data.message) {
                toast.error(error.response.data.message, {
                    position: "top-center"
                });
            } else {
                toast.error("خطای ناشناخته", {
                    position: "top-center"
                });
            }
            // toast.error(`${error.response.data.message || "مشکلی به وجود آمده!"}`, { position: "top-center" });
        } else if (error.request) {
            toast.error(`${error.request}`, { position: "top-center" });
        } else {
            toast.error(`${error.message}`, { position: "top-center" });
        }
        return Promise.reject(error);
    }
);

export default api;