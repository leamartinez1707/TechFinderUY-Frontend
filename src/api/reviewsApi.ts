import api from "./axios";



export const getReviewsByIdRequest = async (username: string) => {
    try {
        const response = await api(`/technicians/${username}/reviews`);
        return response.data.reviews;
    } catch (error) {
        console.error("Error fetching technician reviews:", error);
        throw error;
    }
}