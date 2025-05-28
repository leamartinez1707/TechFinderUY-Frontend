import { useEffect, useState } from "react"
import { Calendar, User, Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingCard from "./BookingCard"
import PaginationUi from "../pagination/PaginationUi"
import { useBooking } from "@/context/BookingContext"
import { useAuth } from "@/context/AuthContext"

const TechnicianBookings = () => {

    const { user } = useAuth(); // Hook para obtener el usuario autenticado, si es necesario
    const { getBookings, bookings } = useBooking(); // Hook para obtener las reservas del contexto

    // Datos de ejemplo - se reemplazarán por los datos del Context
    // const [localBookings, setLocalBookings] = useState<Booking[]>(bookings || []); // Estado local para las reservas
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const itemsPerPage = 5; // Número de elementos por página



    const setPagination = () => {
        // Calcular índices para la paginación
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;

        const currentItems = bookings.slice(indexOfFirstItem, indexOfLastItem);
        // Retornar los elementos de la página actual
        return {
            currentItems,
            totalItems: bookings.length
        }
    }

    const { currentItems, totalItems } = setPagination();

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    // Filtrar reservas por estado
    const pendingBookings = currentItems.filter((booking) => booking.status === "Pendiente")
    const acceptedBookings = currentItems.filter((booking) => booking.status === "Aceptado")
    const completedBookings = currentItems.filter((booking) => booking.status === "Completado")
    const rejectedBookings = currentItems.filter((booking) => booking.status === "Rechazado")

    useEffect(() => {
        if (user?.username && user.technician) {
            // Cargar las reservas al montar el componente
            getBookings(user.username);
        }
    }, []);


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
            <Tabs defaultValue="pending" className="w-full">
                <TabsList className="grid w-full space-y-2 sm:space-y-0 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <TabsTrigger value="pending">Pendientes ({pendingBookings.length})</TabsTrigger>
                    <TabsTrigger value="accepted">Aceptadas ({acceptedBookings.length})</TabsTrigger>
                    <TabsTrigger value="completed">Completadas ({completedBookings.length})</TabsTrigger>
                    <TabsTrigger value="rejected">Rechazadas ({rejectedBookings.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="mt-6">
                    {pendingBookings.length === 0 ? (
                        <div className="text-center py-12">
                            <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium">No tienes reservas pendientes</h3>
                            <p className="text-muted-foreground mt-2">Las nuevas solicitudes aparecerán aquí.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {pendingBookings.map((booking) => (
                                <BookingCard key={booking.id} booking={booking} />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="accepted" className="mt-6">
                    {acceptedBookings.length === 0 ? (
                        <div className="text-center py-12">
                            <Check className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium">No tienes reservas aceptadas</h3>
                            <p className="text-muted-foreground mt-2">Las reservas que aceptes aparecerán aquí.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {acceptedBookings.map((booking) => (
                                <BookingCard key={booking.id} booking={booking} />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="completed" className="mt-6">
                    {completedBookings.length === 0 ? (
                        <div className="text-center py-12">
                            <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium">No tienes servicios completados</h3>
                            <p className="text-muted-foreground mt-2">Los servicios completados aparecerán aquí.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {completedBookings.map((booking) => (
                                <BookingCard key={booking.id} booking={booking} />
                            ))}
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="rejected" className="mt-6">
                    {rejectedBookings.length === 0 ? (
                        <div className="text-center py-12">
                            <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium">No tienes servicios rechazados</h3>
                            <p className="text-muted-foreground mt-2">Los servicios rechazados aparecerán aquí.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {rejectedBookings.map((booking) => (
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
                onPageChange={(page: number) => setCurrentPage(page)}
            />
        </div>
    )
}
export default TechnicianBookings
