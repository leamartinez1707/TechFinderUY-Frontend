// src/context/AuthContext.tsx
import { createContext, ReactNode, useContext, useState } from 'react';

// Define el tipo de los datos que vas a manejar en el contexto
interface AuthContextType {
    user: object | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: object, token: string) => Promise<string>;
    logout: () => void;
}

// Define los valores predeterminados del contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor de contexto
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<object | null>({});
    const [token, setToken] = useState<string | null>(null);

    // Calcular si el usuario está autenticado
    const isAuthenticated = user !== null && token !== null;

    // Función para iniciar sesión
    const login = async (user: object, token: string): Promise<string> => {
        console.log(user);
        setUser(user);
        setToken(token);
        return 'Credenciales correctas';
    };

    // Función para cerrar sesión
    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
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
