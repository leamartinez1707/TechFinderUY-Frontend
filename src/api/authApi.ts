import { isAxiosError } from "axios";
import type { SignIn, SignUp } from "../types";
import api from "./axios";

export const signUpRequest = async (formData: SignUp) => {

    try {
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

export const signInRequest = async (formData: SignIn) => {
    try {
        const { data } = await api.post('/auth/login', formData)
        if (!data) {
            throw new Error('No hay datos en la respuesta de inicio de sesión')
        }
        return data
    } catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.status === 401) {
            return error.status
        }
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}