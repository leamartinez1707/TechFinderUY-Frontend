import { useEffect, useMemo, useState } from "react"
import { Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PaginationUi from "@/components/pagination/PaginationUi"
import BookingCard from "./BookingCard"
import { useBooking } from "@/context/BookingContext"
import { useAuth } from "@/context/AuthContext"
import { BookingStatus } from "@/types"
import { capitalizeFirstLetter } from "@/utils"
import { Button } from "../ui/button"

const TechnicianBookings = () => {

    const { user } = useAuth(); // Hook para obtener el usuario autenticado, si es necesario
    const { getBookings, bookings } = useBooking(); // Hook para obtener las reservas del contexto

    // Estados para manejar la paginación y la pestaña activa
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [activeTab, setActiveTab] = useState<BookingStatus>("Pendiente"); // Pestaña activa, por defecto "Pendiente"
    const [bookingsOrder, setBookingsOrder] = useState("asc"); // Orden de las reservas, por defecto ascendente
    const itemsPerPage = 5; // Número de elementos por página

    // Filtrar las reservas según la pestaña activa
    const filteredBookings = useMemo(() => {
        return bookings.filter(b => b.status === activeTab);
    }, [bookings, activeTab]);

    // Calcular bookings paginados
    const paginatedBookings = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;

        // Si el orden es ascendente, ordenar por la fecha de creación
        if (bookingsOrder === "asc") {
            return filteredBookings.sort((a, b) => new Date(a.id).getTime() - new Date(b.id).getTime())
                .slice(indexOfFirstItem, indexOfLastItem);
        } else {
            // Si el orden es descendente, ordenar por fecha de creación en orden inverso
            return filteredBookings.sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime())
                .slice(indexOfFirstItem, indexOfLastItem);
        }
    }, [filteredBookings, currentPage, bookingsOrder]);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

    console.log(paginatedBookings)

    // Contar las reservas por estado
    const bookingCounts = useMemo(() => {
        return {
            Pendiente: bookings.filter(b => b.status === "Pendiente").length,
            Aceptado: bookings.filter(b => b.status === "Aceptado").length,
            Completado: bookings.filter(b => b.status === "Completado").length,
            Rechazado: bookings.filter(b => b.status === "Rechazado").length,
        };
    }, [bookings]);

    // Manejar el cambio de pestaña
    const handleTabChange = (value: string) => {
        if (["Pendiente", "Aceptado", "Completado", "Rechazado"].includes(value)) {
            setActiveTab(value as BookingStatus);
        }
    };

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
                <Button
                    onClick={() => setBookingsOrder(bookingsOrder === "asc" ? "desc" : "asc")}
                    className="px-4 py-2 my-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    Ordenar por antiguedad ({bookingsOrder === "asc" ? "Ascendente" : "Descendente"})
                </Button>
            </div>

            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full space-y-2 sm:space-y-0 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <TabsTrigger
                        value="Pendiente">Pendientes ({bookingCounts.Pendiente})</TabsTrigger>
                    <TabsTrigger
                        value="Aceptado">Aceptadas ({bookingCounts.Aceptado})</TabsTrigger>
                    <TabsTrigger
                        value="Completado">Completadas ({bookingCounts.Completado})</TabsTrigger>
                    <TabsTrigger
                        value="Rechazado">Rechazadas ({bookingCounts.Rechazado})</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-6">
                    {paginatedBookings.length === 0 ? (
                        <div className="text-center py-12">
                            <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium">No tienes reservas pendientes</h3>
                            <p className="text-muted-foreground mt-2">Las nuevas solicitudes con estado {capitalizeFirstLetter(activeTab.toLowerCase())} aparecerán aquí.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {paginatedBookings.map((booking) => (
                                <BookingCard key={booking.id} booking={booking} />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
            <PaginationUi
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}
export default TechnicianBookings
