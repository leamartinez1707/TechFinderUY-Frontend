import { Review } from "@/types";
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

export const getAllReviewsRequest = async (): Promise<Review[]> => {
    try {
        const response = await api(`/reviews`);
        console.log("Reviews fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching technician reviews:", error);
        throw error;
    }
}