import { getTechniciansRequest, updateLocationDataRequest, updateProfileDataRequest, updateTechnicalDataRequest } from "@/api/techApi";
import type { EditLocationData, EditProfileData, EditTechnicalData, Review, Technicians, User, UserFavorites } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { updateUserDataRequest } from "@/api/usersApi";
import { createUserFavoriteRequest, deleteUserFavoriteRequest, getUserFavoritesRequest } from "@/api/favoritesApi";
import { enqueueSnackbar } from "notistack";
import { getReviewsByIdRequest } from "@/api/reviewsApi";

// Define el tipo de los datos que vas a manejar en el contexto
interface UsersContextType {
    users: User[];
    reviews: Review[];
    technicians: Technicians[];
    favorites: UserFavorites[];

    // Usuarios
    updateUserData: (id: number, userData: object) => Promise<void>;
    getUserFavorites: () => Promise<void>;
    addUserFavorite: (technicianId: number) => void;
    deleteUserFavorite: (technicianId: number) => void;

    // Tecnicos
    getTechnicians: () => Promise<void>;
    getReviews: () => Promise<void>;
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
        try {
            const data = await getTechniciansRequest();
            setTechnicians(data);
        } catch (error) {
            console.error("Error al obtener los técnicos:", error);
            // Aquí podrías manejar el error, por ejemplo, mostrar un mensaje al usuario
            return setTechnicians([]);

        }
    }

    const getReviews = async () => {
        const username = user?.username
        if (!username) {
            console.error("Username is not defined");
            return;
        }

        // Realizar ambas peticiones a la misma vez asíncronamente
        // const [technicianData, revs] = await Promise.all([getTechDataRequest(username!), getReviewsByIdRequest(username!)]);
        const revs = await getReviewsByIdRequest(username!);
        setReviews(revs);
        // // Si ambas peticiones tienen datos, actualizar el estado
        // let newInfo
        // if (technicianData && user) {
        //     newInfo = {
        //         id: user.id,
        //         username: technicianData.username,
        //         firstName: technicianData.firstName,
        //         lastName: technicianData.lastName,
        //         email: technicianData.email,
        //         phone: technicianData.phone,
        //         address: technicianData.address,
        //         isActive: user.isActive,
        //         technician: {
        //             id: technicianData.id,
        //             specialization: technicianData.specialization,
        //             latitude: technicianData.latitude,
        //             longitude: technicianData.longitude,
        //             services: technicianData.services
        //         }
        //     }
        //     setUser(newInfo);
        //     setReviews(revs);
        // }
    }

    const updateProfileData = async (id: number, profileData: EditProfileData) => {
        await updateProfileDataRequest(id, profileData);
        setUser({
            ...user!,
            ...profileData,
        });
    }
    const updateTechnicalData = async (id: number, profileData: EditTechnicalData) => {
        const technicianData = await updateTechnicalDataRequest(id, profileData);
        setUser({
            ...user!,
            technician: {
                id,
                specialization: technicianData.specialization,
                latitude: technicianData.latitude,
                longitude: technicianData.longitude,
                services: technicianData.services
            }
        });
    }

    const updateLocationData = async (id: number, profileData: EditLocationData) => {
        const technicianData = await updateLocationDataRequest(id, profileData);
        setUser({
            ...user!,
            address: technicianData.address,
            technician: {
                id,
                specialization: technicianData.specialization,
                latitude: technicianData.latitude,
                longitude: technicianData.longitude,
                services: technicianData.services
            }
        })
    }

    // Favoritos del usuario
    const getUserFavorites = async () => {
        try {
            const response = await getUserFavoritesRequest();
            setFavorites(response);
        } catch (error) {
            console.error("Error al obtener los favoritos del usuario:", error);
        }
    }

    const addUserFavorite = async (technicianId: number) => {
        try {
            const response: UserFavorites = await createUserFavoriteRequest(technicianId);
            setFavorites((prevFavorites) => [...prevFavorites, response]);
            enqueueSnackbar("Técnico agregado a favoritos", { variant: 'success' });
        } catch (error) {
            console.error("Error al agregar favorito:", error);
        }
    }
    const deleteUserFavorite = async (technicianId: number) => {
        try {
            await deleteUserFavoriteRequest(technicianId);
            setFavorites(prev => prev.filter(fav => fav.technician.id !== technicianId));
            enqueueSnackbar("Técnico eliminado de favoritos", { variant: 'info' });
        } catch (error) {
            console.error("Error al agregar favorito:", error);
        }
    }

    useEffect(() => {
        if (!user) return;
        getTechnicians();
        getReviews();
        if (!user?.technician && user?.id) {
            getUserFavorites();
        }
    }, [user?.id]);

    return (
        <UsersContext.Provider
            value={{
                users,
                technicians,
                getTechnicians,
                getReviews,
                updateProfileData,
                updateTechnicalData,
                updateLocationData,
                reviews,
                updateUserData,
                getUserFavorites,
                favorites,
                addUserFavorite,
                deleteUserFavorite
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