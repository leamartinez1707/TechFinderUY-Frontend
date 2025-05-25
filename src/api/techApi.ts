import { isAxiosError } from "axios";
import api from "./axios";
import { EditLocationData, EditProfileData, EditTechnicalData } from "@/types";

export const getTechnicianData = async (id: number) => {

    try {
        const { data } = await api('/technicians/' + id);
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

export const getTechniciansRequest = async () => {
    try {
        const { data } = await api('/technicians/');
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

export const getTechDataRequest = async (username: string) => {
    try {
        const { data } = await api(`/technicians/${username}`);
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

export const getMyDataRequest = async () => {
    try {
        const { data } = await api('/technicians/me');
        if (!data) {
            throw new Error('No hay datos en la respuesta de la API');
        }
        return data;
    } catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.message) {
            throw new Error(error.message);
        }
    }
}

export const updateProfileDataRequest = async (id: number, userData: EditProfileData) => {
    try {
        const { data } = await api.put(`/technicians/${id}`, userData);
        if (!data) {
            throw new Error('No hay datos en la respuesta de la API');
        }
        return data;
    } catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.message) {
            throw new Error(error.message);
        }
    }
}

export const updateTechnicalDataRequest = async (id: number, userData: EditTechnicalData) => {
    try {
        const { data } = await api.put(`/technicians/${id}`, userData);
        if (!data) {
            throw new Error('No hay datos en la respuesta de la API');
        }
        return data;
    } catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.message) {
            throw new Error(error.message);
        }
    }
}
export const updateLocationDataRequest = async (id: number, userData: EditLocationData) => {
    try {
        const { data } = await api.put(`/technicians/${id}`, userData);
        if (!data) {
            throw new Error('No hay datos en la respuesta de la API');
        }
        return data;
    } catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.message) {
            throw new Error(error.message);
        }
    }
}

