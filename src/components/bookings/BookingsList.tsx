import { capitalizeFirstLetter } from '@/utils'
import PaginationUi from '@/components/pagination/PaginationUi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar } from 'lucide-react'
import { Booking } from '@/types'
import BookingCard from '@/components/technician/BookingCard'

interface BookingsListProps {
    activeTab: string;
    handleTabChange: (value: string) => void;
    bookingCounts: {
        Pendiente: number;
        Aceptado: number;
        Completado: number;
        Rechazado: number;
    };
    paginatedBookings: Booking[]
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

const BookingsList = ({ activeTab, handleTabChange, bookingCounts, paginatedBookings, currentPage, totalPages, setCurrentPage }: BookingsListProps) => {
    return (
        <section>
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
        </section>
    )
}

export default BookingsList