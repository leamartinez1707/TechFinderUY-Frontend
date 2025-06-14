import { addBookingRequest, deleteBookingRequest, getBookingsRequest, getUserBookingsRequest, updateBookingRequest } from "@/api/bookingsApi";
import { Booking, Bookings, CreateBooking } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

type BookingContextType = {
    bookings: Booking[] | []
    addBooking: (booking: CreateBooking) => Promise<void>
    deleteBooking: (id: number) => Promise<void>
    updateBooking: (id: number, booking: Booking) => Promise<void>

    getBookings: (username: string) => Promise<void>
    getUserBookings: (username: string) => Promise<void>
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

    const updateBooking = async (id: number, booking: Booking) => {
        // logica para actualizar la reserva
        const newBooking: CreateBooking = {
            ...booking,
            user: booking.user.id,
            technician: booking.technician.id,
        };
        const response = await updateBookingRequest(id, newBooking);
        if (!response) {
            throw new Error("Hubo un error al actualizar la reserva, intente nuevamente");
        }
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
            setBookings(response.bookings);
        } catch (error) {
            console.error("Error obteniendo reservas:", error);
        }
    };

    const getUserBookings = async (username: string) => {
        if (!username) {
            return;
        }
        try {
            const response = await getUserBookingsRequest(username);
            setBookings(response);
        } catch (error) {
            console.error("Error obteniendo reservas del usuario:", error);
        }
    }

    return (
        <BookingContext.Provider value={{
            bookings,
            addBooking,
            deleteBooking,
            updateBooking,
            getBookings,
            getUserBookings,
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

