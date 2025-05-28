import { Bookings, CreateBooking } from "@/types";
import api from "./axios";

export const addBookingRequest = async (booking: CreateBooking): Promise<Bookings> => {
    try {
        const { data } = await api.post<Bookings>('/bookings', booking);
        return data;
    } catch (error) {
        console.error("Error adding booking:", error);
        throw error;
    }
}

export const deleteBookingRequest = async (id: number) => {
    try {
        const { data } = await api.delete(`/bookings/${id}`);
        return data;
    } catch (error) {
        console.error("Error deleting booking:", error);
        throw error;
    }
}

export const updateBookingRequest = async (id: number, booking: object) => {
    try {
        const { data } = await api.patch(`/bookings/${id}`, booking);
        return data;
    } catch (error) {
        console.error("Error updating booking:", error);
        throw error;
    }
}

export const getBookingsRequest = async (username: string) => {
    try {
        const { data } = await api(`/technicians/${username}`);
        return data;
    } catch (error) {
        console.error("Error fetching bookings:", error);
        throw error;
    }
}
export const getBookingByIdRequest = async (id: number) => {
    try {
        const { data } = await api(`/bookings/${id}`);
        return data;
    } catch (error) {
        console.error("Error fetching bookings:", error);
        throw error;
    }
}
