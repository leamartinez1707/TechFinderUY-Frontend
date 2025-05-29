import api from "./axios";



export const updateUserDataRequest = async (id: number, profileData: object) => {
    try {
        const { data } = await api.patch(`/users/${id}`, profileData);
        return data;
    } catch (error) {
        console.error("Error updating user data:", error);
        throw error;
    }
    throw new Error("Error al actualizar los datos del usuario");
}

