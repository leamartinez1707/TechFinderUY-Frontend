import type { SignIn, SignUp, SignUpUser } from "../types";
import api from "./axios";

export const signUpRequest = async (formData: SignUp) => {
    const { data } = await api.post('technicians', formData)
    if (!data) {
        throw new Error('No hay datos en la respuesta de registro')
    }
    return data
}

export const signUpUserRequest = async (formData: SignUpUser) => {
    const { data } = await api.post('users', formData)
    if (!data) {
        throw new Error('No hay datos en la respuesta de registro')
    }
    return data
}

export const signInRequest = async (formData: SignIn) => {
    const { data } = await api.post('/auth/login', formData)
    if (!data) {
        throw new Error('No hay datos en la respuesta de inicio de sesión')
    }
    return data
}

export const verifyTokenRequest = async (refresh_token: string) => {
    const { data } = await api.post('/auth/refresh', { refresh_token })
    if (!data || !data.user || !data.access_token) {
        throw new Error('No se pudo verificar el token')
    }
    return data
}