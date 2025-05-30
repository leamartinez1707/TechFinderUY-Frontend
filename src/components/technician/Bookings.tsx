import { useEffect } from "react"
import { useBooking } from "@/context/BookingContext"
import { useAuth } from "@/context/AuthContext"
import BookingsList from "@/components/bookings/BookingsList"
import BookingsOrderButton from "../bookings/BookingsOrderButton"
import { useBookingsPagination } from "@/hooks/useBookingsPagination"
import { Button } from "../ui/button"

const TechnicianBookings = () => {

    const { user } = useAuth(); // Hook para obtener el usuario autenticado, si es necesario
    const { getBookings, bookings } = useBooking(); // Hook para obtener las reservas del contexto

    const { activeTab, bookingCounts, bookingsOrder, currentPage, handleTabChange, paginatedBookings, setBookingsOrder, setCurrentPage, totalPages } = useBookingsPagination({ bookings })


    // Efecto para cargar las reservas al montar el componente
    useEffect(() => {
        if (user?.username && user.technician) {
            // Cargar las reservas al montar el componente
            getBookings(user.username);
        }
    }, []);

    // Restablece la página actual a 1 cuando cambian los filtros
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Mis Reservas</h1>

            <p className="text-lg mb-4 text-gray-700 font-sans border-b-gray-500 border-b">Desde aqui podras adminstrar todas tus reservas. Cambia entre las pestañas para ver las reservas segun su estado.</p>
            <p className="text-lg mb-4 text-gray-700 font-sans">- En <span className="font-bold">Pendientes</span> puedes aceptar o cancelar una reserva.</p>
            <div>
                <p className="text-lg mb-4 text-gray-700 font-sans">- En <span className="font-bold">Aceptadas</span> puedes marcar como completada una reserva. Esto solo marcalo cuando finalices el servicio.</p>
                <p className="text-lg pl-10 mb-4"><span className="font-semibold text-red-500">Importante: </span>Asegurate de que tu cliente acepte el servicio como completado para que tu pago sea realizado.</p>
            </div>
            <p className="text-lg mb-4 text-gray-700 font-sans">- En <span className="text-black font-bold">Finalizadas</span> puedes aceptar o cancelar una reserva.</p>
            <div>
                <p className="text-lg mb-4 text-gray-700 font-sans">- En <span className="text-red-500 font-bold">Rechazadas</span> puedes ver las reservas que has rechazado.</p>
            </div>

            <div>
                <p className="text-lg mb-4 text-gray-700 font-sans">- Puedes cambiar el orden de las reservas por fecha de creación, haciendo click en el boton de orden.</p>
                <BookingsOrderButton
                    bookingsOrder={bookingsOrder}
                    setBookingsOrder={setBookingsOrder}
                />
            </div>
            <div>
                <p className="text-lg mb-4 text-gray-700 font-sans"></p>
                <Button
                    onClick={() => {
                        if (user?.username) {
                            getBookings(user.username);
                        }
                    }}
                    className="px-4 py-2 my-4 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors">
                    Recargar reservas
                </Button>
            </div>

            <BookingsList
                activeTab={activeTab}
                handleTabChange={handleTabChange}
                bookingCounts={bookingCounts}
                paginatedBookings={paginatedBookings}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}
export default TechnicianBookings
