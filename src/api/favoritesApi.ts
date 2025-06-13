import { isAxiosError } from "axios";
import api from "./axios";
import { UserFavorites } from "@/types";



export const getUserFavoritesRequest = async (id: number) => {

    try {
        const { data } = await api<UserFavorites[]>('/favorites/' + id);
        console.log(data)
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

export const createUserFavoriteRequest = async (technicianId: number) => {

    try {
        const { data } = await api.post(`/favorites/${technicianId}`);
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

export const deleteUserFavoriteRequest = async (technicianId: number) => {

    try {
        await api.delete(`/favorites/${technicianId}`);
    } catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}