import axios from 'axios';
import Cookies from 'js-cookie';


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
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

        if (
            error.response?.status === 401 &&
            !originalRequest._retry // prevenimos bucles infinitos
        ) {
            originalRequest._retry = true;

            try {
                // Llamamos al backend para refrescar el token (debe usar el refresh_token desde cookie httpOnly)
                const refresh_token = Cookies.get('refresh_token');
                console.log('Refresh token:', refresh_token);
                if (!refresh_token) {
                    // Si no hay refresh token, redirigimos al login
                    Cookies.remove('access_token');
                    window.location.href = '/login';
                    return Promise.reject(error);
                }
                const { data } = await api.post(
                    import.meta.env.VITE_API_URL + '/auth/refresh',
                    { refresh_token },
                    {
                        withCredentials: true, // Aseguramos que se envíen las cookies
                    }
                );

                const newAccessToken = data.access_token;

                // Actualizamos la cookie del access token
                Cookies.set('access_token', newAccessToken, {
                    secure: true,
                    sameSite: 'Strict',
                    expires: 1 / 24, // opcional: 1 hora (1 día / 24)
                });

                // Reintentamos la petición original con el nuevo token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Si falla el refresh, redirigimos al login
                Cookies.remove('access_token');
                Cookies.remove('refresh_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;


