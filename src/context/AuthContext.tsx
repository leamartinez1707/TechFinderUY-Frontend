// src/context/AuthContext.tsx
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { signInRequest, signUpRequest, signUpUserRequest, verifyTokenRequest } from '../api/authApi';
import type { LoggedUser, SignIn, SignUp, SignUpUser, User, UserTechnician } from '../types';
import { getTechnicianData } from '../api/techApi';
import { isAxiosError } from 'axios';
import Cookies from "js-cookie";

// Define el tipo de los datos que vas a manejar en el contexto
interface AuthContextType {
    user: LoggedUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    setUser: (user: LoggedUser | null) => void;
    login: (user: SignIn) => Promise<void>;
    register: (user: SignUp | SignUpUser) => void;
    logout: () => void;
    getTechProfile: (id: number) => void;
}

// Define los valores predeterminados del contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor de contexto
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | UserTechnician | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Función para iniciar sesión
    const login = async (user: SignIn): Promise<void> => {  
        setIsLoading(true);
        try {
            const data = await signInRequest({ ...user });
            if (data.statusCode === 401 || !data.user || !data.access_token || !data.refresh_token) {
                throw new Error("Credenciales incorrectas");
            }

            Cookies.set("access_token", data.access_token);
            Cookies.set("refresh_token", data.refresh_token);
            localStorage.setItem("user", JSON.stringify(data.user)); // Guardar el usuario en localStorage
            setUser(data.user);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error)
            setUser(null);
            setIsAuthenticated(false);
            if (isAxiosError(error) && error.response?.status === 401) {
                throw new Error("Credenciales incorrectas");
            }
            throw new Error("Error al iniciar sesión");
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (user: SignUp | SignUpUser) => {
        setIsLoading(true);
        try {
            if ('services' in user && Array.isArray(user.services)) {
                // Si tiene 'services', es un técnico
                const response = await signUpRequest(user);
                return response;
            } else {
                // Si no tiene 'services', es un usuario común
                const response = await signUpUserRequest(user);
                return response;
            }
        } catch (error) {
            console.log(error)
            if (isAxiosError(error) && error.response?.status === 401) {
                throw new Error("Credenciales incorrectas");
            }
            if (isAxiosError(error) && error.response?.status === 400) {
                throw new Error(error.response.data.message[0] || "Error al registrar usuario");
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
    };

    // Función para cerrar sesión
    const logout = () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        localStorage.removeItem("user"); // Limpiar el usuario de localStorage
        setUser(null);
        setIsAuthenticated(false);
    };


    useEffect(() => {
        const checkLogin = async () => {
            setIsLoading(true);
            try {
                const token = Cookies.get("refresh_token");
                if (!token) {
                    setIsAuthenticated(false);
                    setUser(null);
                    return;
                }

                // Verificar el token en el backend
                const data = await verifyTokenRequest(token);
                console.log(data)
                if (!data) {
                    setIsAuthenticated(false);
                    setUser(null);
                    return;
                }
                setUser(data.user);
                setIsAuthenticated(true);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setIsLoading(false); // Esto se ejecuta siempre al final
            }
        };

        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout, isAuthenticated, getTechProfile, isLoading }}>
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
