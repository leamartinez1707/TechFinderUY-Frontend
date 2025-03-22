// src/context/AuthContext.tsx
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { signInRequest, signUpRequest, signUpUserRequest } from '../api/authApi';
import type { SignIn, SignUp, SignUpUser, User } from '../types';
import { getTechnicianData } from '../api/techApi';
import { isAxiosError } from 'axios';

// Define el tipo de los datos que vas a manejar en el contexto
interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (user: SignIn) => Promise<void>;
    register: (user: SignUp | SignUpUser) => void;
    logout: () => void;
    validateToken: () => void;
    getTechProfile: (id: number) => void;
}

// Define los valores predeterminados del contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor de contexto
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Calcular si el usuario está autenticado
    const isAuthenticated = user !== null && token !== null;

    // Función para iniciar sesión
    const login = async (user: SignIn): Promise<void> => {
        // Aquí deberías hacer la petición a tu API para iniciar sesión
        setIsLoading(true);
        try {
            const data = await signInRequest({ ...user });
            if (data.statusCode === 401 || !data.user || !data.access_token) {
                throw new Error("Credenciales incorrectas");
            }

            // devolver los datos del tecnico y agregarlos al estado

            setUser(data.user);
            setToken(data.access_token);
            // Modificar y guardar en cookies despues, y el usuario obtenerlo al realizar la llamada de la api
            localStorage.setItem('access_token', JSON.stringify(data.access_token));
            localStorage.setItem('userData', JSON.stringify(data.user));
        } catch (error) {
            console.log(error)
            setUser(null);
            setToken(null);
            if (isAxiosError(error) && error.response?.status === 401) {
                throw new Error("Credenciales incorrectas");
            }
            throw new Error("Error al iniciar sesión");
        } finally {
            console.log('entro finally')
            setIsLoading(false);
        }
    };

    const register = async (user: SignUp | SignUpUser) => {
        setIsLoading(true);
        try {
            if ('services' in user && Array.isArray(user.services)) {
                // Si tiene 'services', es un técnico
                const response = await signUpRequest(user);
                console.log(response);
                return response;
            } else {
                // Si no tiene 'services', es un usuario común
                const response = await signUpUserRequest(user);
                console.log(response);
                return response;
            }
        } catch (error) {
            console.log(error)
            if (isAxiosError(error) && error.response?.status === 401) {
                throw new Error("Credenciales incorrectas");
            }
            throw new Error("Error al iniciar sesión");
        }
        finally {
            setIsLoading(false);
        }
    }

    // Función para obtener el perfil de un técnico
    const getTechProfile = async (id: number) => {
        const response = await getTechnicianData(id);
        if (response === 401) return null;
        console.log(response);
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('userData');
        setUser(null);
        setToken(null);
    };

    const validateToken = () => {
        const token = localStorage.getItem('access_token');
        if (!token || token === 'undefined') {
            setToken(null);

        } else {
            setToken(JSON.parse(token));
        }
        const user = localStorage.getItem('userData');
        if (!user || user === 'undefined' || user === 'null') {
            setUser(null);
        } else {
            console.log(JSON.parse(user));
            setUser(JSON.parse(user));
        }
    }

    useEffect(() => {
        validateToken();
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated, getTechProfile, validateToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto de autenticación
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
