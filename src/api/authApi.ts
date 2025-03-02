import { isAxiosError } from "axios";
import { SignUp } from "../types";
import api from "./axios";




export const signUpRequest = async (formData: SignUp) => {

    try {
        console.log(formData)
        const { data } = await api.post('/technicians', formData)
        if (!data) {
            throw new Error('No hay datos en la respuesta de registro')
        }
        return data
    } catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }


}