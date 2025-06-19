import axios from 'axios';
import Cookies from 'js-cookie';


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

// 🔄 Interceptor para manejar expiración del token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        console.log('Interceptor de respuesta activado:', {
            status: error.response?.status,
            url: originalRequest.url,
        });

        if (
            error.response?.status === 401 &&
            !originalRequest._retry // prevenir bucles infinitos
        ) {
            originalRequest._retry = true;

            try {
                const refresh_token = Cookies.get('refresh_token');
                if (!refresh_token) {
                    // Si no hay refresh token, solo limpia los tokens y rechaza el error
                    Cookies.remove('access_token');
                    Cookies.remove('refresh_token');
                    return Promise.reject(error);
                }
                const { data } = await api.post(
                    import.meta.env.VITE_API_URL + 'auth/refresh',
                    { refresh_token },
                );
                const newAccessToken = data.access_token;
                const newRefreshToken = data.refresh_token;

                Cookies.set('access_token', newAccessToken)
                Cookies.set('refresh_token', newRefreshToken)

                // Reintentamos la petición original con el nuevo token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                Cookies.remove('access_token');
                Cookies.remove('refresh_token');
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;


