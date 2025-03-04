// src/context/AuthContext.tsx
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { signInRequest } from '../api/authApi';
import type { SignIn, User } from '../types';
import { getTechnicianData } from '../api/techApi';

// Define el tipo de los datos que vas a manejar en el contexto
interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: SignIn) => Promise<string | null>;
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

    // Calcular si el usuario está autenticado
    const isAuthenticated = user !== null && token !== null;

    // Función para iniciar sesión
    const login = async (user: SignIn): Promise<string | null> => {
        // Aquí deberías hacer la petición a tu API para iniciar sesión
        const data = await signInRequest({ ...user });
        if (data.status === 401) return null;

        const response = await getTechnicianData(1);
        if (response === 401 || !response) return null;
        setUser(response);
        setToken(data.acess_token);

        // Modificar y guardar en cookies despues, y el usuario obtenerlo al realizar la llamada de la api
        localStorage.setItem('access_token', JSON.stringify(data.access_token));
        localStorage.setItem('userData', JSON.stringify(response));
        return 'Credenciales correctas';
    };

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
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated, getTechProfile, validateToken }}>
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
