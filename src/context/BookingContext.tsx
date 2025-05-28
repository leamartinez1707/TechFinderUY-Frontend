import { addBookingRequest, deleteBookingRequest, getBookingsRequest, updateBookingRequest } from "@/api/bookingsApi";
import { Booking, Bookings, CreateBooking } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

type BookingContextType = {
    bookings: Booking[] | []
    addBooking: (booking: CreateBooking) => Promise<void>
    deleteBooking: (id: number) => Promise<void>
    updateBooking: (id: number, booking: object) => Promise<void>

    getBookings: (username: string) => Promise<void>
    setBookings: (bookings: Booking[]) => void
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

interface BookingProviderProps {
    children: ReactNode
}

export const BookingProvider = ({ children }: BookingProviderProps) => {

    const [bookings, setBookings] = useState<Booking[]>([]);

    const addBooking = async (booking: CreateBooking) => {
        // logica para agregar la reserva

        const response: Bookings = await addBookingRequest(booking);
        if (!response) {
            throw new Error("Hubo un error al agregar la reserva, intente nuevamente");
        }
        // setBookings([...bookings, response]);
    }

    const deleteBooking = async (id: number) => {
        // logica para eliminar la reserva
        const response = await deleteBookingRequest(id);
        if (!response) {
            throw new Error("Hubo un error al eliminar la reserva, intente nuevamente");
        }
        // setBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
    }

    const updateBooking = async (id: number, booking: object) => {
        // logica para actualizar la reserva
        const response = await updateBookingRequest(id, booking);
        if (!response) {
            throw new Error("Hubo un error al actualizar la reserva, intente nuevamente");
        }
        console.log(response);
        setBookings(prevBookings =>
            prevBookings.map(b => b.id === id ? response : b)
        );
    }

    const getBookings = async (username: string) => {
        if (!username) {
            return;
        }
        try {
            const response = await getBookingsRequest(username);
            console.log("Bookings obtenidos:", response.bookings);
            setBookings(response.bookings);
        } catch (error) {
            console.error("Error obteniendo reservas:", error);
        }
    };

    return (
        <BookingContext.Provider value={{
            bookings,
            addBooking,
            deleteBooking,
            updateBooking,
            getBookings,
            setBookings,
        }}>
            {children}
        </BookingContext.Provider>
    )
}

// Hook para usar el contexto de autenticación
export const useBooking = (): BookingContextType => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within an BookingProvider');
    }
    return context;
};

