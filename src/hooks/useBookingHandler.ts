import { useState } from "react";
import { useSnackbar } from "notistack";
import { CreateBooking, Technicians } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { useBooking } from "@/context/BookingContext";

export function useBookingHandler() {
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth();
    const { addBooking } = useBooking();

    const [bookingData, setBookingData] = useState<CreateBooking | null>(null);
    const [addBookingModal, setAddBookingModal] = useState<boolean>(false);
    const [selectedTechnician, setSelectedTechnician] = useState<Technicians & { distance?: number } | null>(null);

    const handleAddBooking = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!selectedTechnician || !user?.id) {
                enqueueSnackbar("Por favor, seleccione un técnico y asegúrese de estar autenticado", { variant: "error" });
                return;
            }

            if (bookingData?.date && new Date(bookingData.date) < new Date()) {
                enqueueSnackbar("La fecha de la reserva no puede ser anterior a la fecha actual", { variant: "error" });
                return;
            }

            if (!bookingData?.comment || bookingData.comment.trim() === "") {
                enqueueSnackbar("Por favor, ingrese un comentario para la reserva", { variant: "error" });
                return;
            }

            const booking: CreateBooking = {
                technician: selectedTechnician.id,
                comment: bookingData.comment,
                date: bookingData.date,
                user: user.id,
                status: "Pendiente",
            };

            await addBooking(booking);
            enqueueSnackbar("Reserva enviada correctamente", { variant: "success" });
            setAddBookingModal(false);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            enqueueSnackbar("Hubo un error al enviar la reserva, intente nuevamente", { variant: "error" });
        }
    };

    return {
        bookingData,
        setBookingData,
        selectedTechnician,
        setSelectedTechnician,
        addBookingModal,
        setAddBookingModal,
        handleAddBooking,
    };
}
