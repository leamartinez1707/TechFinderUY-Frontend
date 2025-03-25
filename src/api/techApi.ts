import { isAxiosError } from "axios";
import api from "./axios";

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

export const getTechniciansRquest = async () => {
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