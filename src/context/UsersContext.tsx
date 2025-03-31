import { getTechDataRequest, getTechniciansRequest } from "@/api/techApi";
import type { TechnicianReview, Technicians, User } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

// Define el tipo de los datos que vas a manejar en el contexto
interface UsersContextType {
    users: User[];
    reviews: TechnicianReview | undefined;
    technicians: Technicians[];
    getTechnicians: () => Promise<void>;
    getTechData: () => Promise<void>;
}
// Define los valores predeterminados del contexto
const UsersContext = createContext<UsersContextType | undefined>(undefined);

// Proveedor de contexto
interface AuthProviderProps {
    children: ReactNode;
}

export const UsersProvider = ({ children }: AuthProviderProps) => {
    const { user } = useAuth()
    const [users,] = useState([]);
    const [reviews, setReviews] = useState<TechnicianReview | undefined>();
    const [technicians, setTechnicians] = useState([]);


    const getTechnicians = async () => {
        const data = await getTechniciansRequest();
        setTechnicians(data);
    }

    const getTechData = async () => {
        const username = user?.username
        const data = await getTechDataRequest(username as string);
        console.log(data)
        setReviews(data);
    }

    useEffect(() => {
        if (technicians.length === 0) {
            getTechnicians();

        }
        if (user) {
            getTechData();
        }
    }, [technicians]);

    return (
        <UsersContext.Provider
            value={{
                users,
                technicians,
                getTechnicians,
                getTechData,
                reviews
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