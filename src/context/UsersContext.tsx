import { getTechniciansRquest } from "@/api/techApi";
import { Technicians, User } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";



// Define el tipo de los datos que vas a manejar en el contexto
interface UsersContextType {
    users: User[];
    technicians: Technicians[];
    getTechnicians: () => Promise<void>;
}
// Define los valores predeterminados del contexto
const UsersContext = createContext<UsersContextType | undefined>(undefined);

// Proveedor de contexto
interface AuthProviderProps {
    children: ReactNode;
}

export const UsersProvider = ({ children }: AuthProviderProps) => {

    const [users,] = useState([]);
    const [technicians, setTechnicians] = useState([]);


    const getTechnicians = async () => {
        const data = await getTechniciansRquest();
        setTechnicians(data);
    }

    useEffect(() => {
        if (technicians.length === 0) {
            getTechnicians();
        }
    }, [technicians]);

    return (
        <UsersContext.Provider
            value={{
                users,
                technicians,
                getTechnicians
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