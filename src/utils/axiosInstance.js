import axios from 'axios';
import { toast } from 'react-toastify';

// ایجاد یک نمونه از Axios
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        // بررسی نیاز به احراز هویت
        if (config.requiresAuth) {
            const token = window.localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                toast.error('احراز هویت موفقیت آمیز نبود');
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
            if (error.response.status === 401) {
                // توکن منقضی شده یا نامعتبر است
                toast.error('توکن شما منقضی شده است. لطفاً دوباره وارد شوید.');
                if (typeof window !== 'undefined') {
                    window.localStorage.removeItem('token');
                    window.location.href = '/login'; // هدایت به صفحه لاگین
                }
            } else if (error.response.data.errors) {
                const errors = error.response.data.errors;
                Object.keys(errors).forEach((key) => {
                    errors[key].forEach((message) => {
                        toast.error(message);
                    });
                });
            } else if (error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("خطای ناشناخته");
            }
        } else if (error.request) {
            toast.error(`${error.request}`);
        } else {
            toast.error(`${error.message}`);
        }
        return Promise.reject(error);
    }
);

export default api;