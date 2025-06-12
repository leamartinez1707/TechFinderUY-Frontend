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
    login: (user: SignIn) => Promise<boolean>;
    register: (user: SignUp | SignUpUser) => Promise<boolean>;
    logout: () => void;
    getTechProfile: (id: number) => void;
    errors: string[];
    setErrors: (errors: string[]) => void;
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
    const [errors, setErrors] = useState<string[]>([]);

    // Función para iniciar sesión
    const login = async (user: SignIn) => {
        setIsLoading(true);
        try {
            const data = await signInRequest({ ...user })
            if (data.statusCode === 401 || !data.user || !data.access_token || !data.refresh_token) {
                setErrors(["Credenciales incorrectas"])
                return false;
            }
            Cookies.set("access_token", data.access_token);
            Cookies.set("refresh_token", data.refresh_token);
            setUser(data.user);
            setIsAuthenticated(true);
            setErrors([]); // Limpiar errores al iniciar sesión correctamente
            return true;
        } catch (error) {
            if (isAxiosError(error)) {
                if (error?.status === 401) {
                    setErrors(["Error de autenticación"]);
                } else {
                    const message = error.response?.data?.message || "Error al iniciar sesión";
                    setErrors([message]);
                }
            } else {
                if (error instanceof Error) {
                    setErrors(["Error al iniciar sesión"]);
                }
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (user: SignUp | SignUpUser) => {
        setIsLoading(true);
        try {
            if ('services' in user && Array.isArray(user.services)) {
                // Si tiene 'services', es un técnico
                await signUpRequest(user);
                return true;
            } else {
                // Si no tiene 'services', es un usuario común
                await signUpUserRequest(user);
                return true;
            }
        } catch (error) {
            console.log(error);
            if (isAxiosError(error)) {
                if (error.response?.status === 400) {
                    const message = error.response.data?.message ?? 'Error en el registro';
                    setErrors([message]);
                }
            }
            setErrors(['Error al registrar el usuario']);
            return false;
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
                console.log("Token de refresco:", token);
                if (!token) {
                    setIsAuthenticated(false);
                    setUser(null);
                    return;
                }
                // Verificar el token en el backend
                const data = await verifyTokenRequest(token);

                if (!data) {
                    setIsAuthenticated(false);
                    setUser(null);
                    return;
                }
                setUser(data.user);
                setIsAuthenticated(true);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            isAuthenticated,
            setUser,
            login,
            register,
            logout,
            getTechProfile,
            errors,
            setErrors
        }
        }>
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
