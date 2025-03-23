import { createContext, ReactNode, useContext, useState } from "react";



// Define el tipo de los datos que vas a manejar en el contexto
interface UsersContextType {
    users: unknown[];
    technicians: unknown[];
}
// Define los valores predeterminados del contexto
const UsersContext = createContext<UsersContextType | undefined>(undefined);

// Proveedor de contexto
interface AuthProviderProps {
    children: ReactNode;
}

export const UsersProvider = ({ children }: AuthProviderProps) => {

    const [users, ] = useState([]);
    const [technicians, ] = useState([]);

    return (
        <UsersContext.Provider
            value={{
                users,
                technicians
            }}>
            {children}
        </UsersContext.Provider>
    );
};

// Hook para usar el contexto de autenticación
export const useUsers = (): UsersContextType => {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error('useUsers must be used within an UsersProvider');
    }
    return context;
};