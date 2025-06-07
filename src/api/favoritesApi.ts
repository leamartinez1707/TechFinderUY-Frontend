import { isAxiosError } from "axios";
import api from "./axios";
import { UserFavorites } from "@/types";



export const getUserFavoritesRequest = async (id: number) => {

    try {
        const { data } = await api<UserFavorites[]>('/favorites/' + id);
        if (!data) {
            throw new Error('No hay datos en la respuesta de la API');
        }
        return data
    } catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw error;
    }
}

export const createUserFavoriteRequest = async (userId: number, technicianId: number) => {

    try {
        const { data } = await api.post(`/favorites/${userId}/${technicianId}`);
        if (!data) {
            throw new Error('No hay datos en la respuesta de la API');
        }
        return data
    } catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export const deleteUserFavoriteRequest = async (userId: number, technicianId: number) => {

    try {
        await api.delete(`/favorites/${userId}/${technicianId}`);
    } catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}