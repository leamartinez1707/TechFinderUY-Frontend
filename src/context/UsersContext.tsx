import { getTechDataRequest, getTechniciansRequest, updateLocationDataRequest, updateProfileDataRequest, updateTechnicalDataRequest } from "@/api/techApi";
import type { EditLocationData, EditProfileData, EditTechnicalData, LoggedUser, Review, Technicians, User, UserFavorites } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { updateUserDataRequest } from "@/api/usersApi";
import { createUserFavoriteRequest, getUserFavoritesRequest } from "@/api/favoritesApi";

// Define el tipo de los datos que vas a manejar en el contexto
interface UsersContextType {
    users: User[];
    reviews: Review[];
    technicians: Technicians[];
    favorites: UserFavorites[];

    // Usuarios
    updateUserData: (id: number, userData: object) => Promise<void>;
    getUserFavorites: (id: number) => Promise<void>;
    addUserFavorite: (userId: Pick<LoggedUser, 'id'>, technicianId: Pick<Technicians, 'id'>) => void;

    // Tecnicos
    getTechnicians: () => Promise<void>;
    getTechData: () => Promise<void>;
    updateProfileData: (id: number, profileData: EditProfileData) => Promise<void>;
    updateTechnicalData: (id: number, profileData: EditTechnicalData) => Promise<void>;
    updateLocationData: (id: number, profileData: EditLocationData) => Promise<void>;

}
// Define los valores predeterminados del contexto
const UsersContext = createContext<UsersContextType | undefined>(undefined);

// Proveedor de contexto
interface AuthProviderProps {
    children: ReactNode;
}

export const UsersProvider = ({ children }: AuthProviderProps) => {
    const [users,] = useState([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [technicians, setTechnicians] = useState([]);
    const [favorites, setFavorites] = useState<UserFavorites[]>([]);

    const { user, setUser } = useAuth()
    // Context de usuarios

    const updateUserData = async (id: number, userData: object) => {
        const data = await updateUserDataRequest(id, userData)
        if (data) {
            setUser({
                ...user,
                ...data,
            });
        }
    }

    // Context de técnicos
    const getTechnicians = async () => {
        const data = await getTechniciansRequest();
        setTechnicians(data);
    }

    const getTechData = async () => {
        const username = user?.username
        const data = await getTechDataRequest(username as string);
        let newInfo
        if (data && user) {
            newInfo = {
                id: user.id,
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                isActive: user.isActive,
                technician: {
                    id: data.id,
                    specialization: data.specialization,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    services: data.services
                }
            }
            setUser(newInfo);
            setReviews(data.reviews);
        }
    }

    const updateProfileData = async (id: number, profileData: EditProfileData) => {
        await updateProfileDataRequest(id, profileData);
        setUser({
            ...user!,
            ...profileData,
        });
    }
    const updateTechnicalData = async (id: number, profileData: EditTechnicalData) => {
        const data = await updateTechnicalDataRequest(id, profileData);
        setUser({
            ...user!,
            technician: {
                id,
                specialization: data.specialization,
                latitude: data.latitude,
                longitude: data.longitude,
                services: data.services
            }
        });
    }

    const updateLocationData = async (id: number, profileData: EditLocationData) => {
        const data = await updateLocationDataRequest(id, profileData);
        setUser({
            ...user!,
            address: data.address,
            technician: {
                id,
                specialization: data.specialization,
                latitude: data.latitude,
                longitude: data.longitude,
                services: data.services
            }
        })
    }

    // Favoritos del usuario

    const getUserFavorites = async (id: number) => {
        try {
            const response = await getUserFavoritesRequest(id);
            setFavorites(response);
        } catch (error) {
            console.error("Error al obtener los favoritos del usuario:", error);
        }
    }

    const addUserFavorite = async (userId: Pick<LoggedUser, 'id'>, technicianId: Pick<Technicians, 'id'>) => {
        try {
            const response = await createUserFavoriteRequest(userId, technicianId);
            console.log("Favorito agregado:", response);
        } catch (error) {
            console.error("Error al agregar favorito:", error);
        }
    }

    useEffect(() => {
        getTechnicians();

        if (user?.technician) {
            getTechData();
        }
    }, []);
    return (
        <UsersContext.Provider
            value={{
                users,
                technicians,
                getTechnicians,
                getTechData,
                updateProfileData,
                updateTechnicalData,
                updateLocationData,
                reviews,
                updateUserData,
                getUserFavorites,
                favorites,
                addUserFavorite
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