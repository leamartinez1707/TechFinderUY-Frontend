import { formatDate } from "@/lib/utils"
import { Calendar, Clock, Phone, Mail, MapPin, Check, X } from "lucide-react"
import { CardTitle } from "../ui/card"
import { enqueueSnackbar } from "notistack"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardHeader, CardContent } from "../ui/card"
import { Booking, BookingStatus } from "@/types"
import { useBooking } from "@/context/BookingContext"
import { useAuth } from "@/context/AuthContext"
import { useMemo } from "react"

// Tipos básicos para las reservas
interface BookingCardProps {
    booking: Booking
}

// Componente para renderizar una tarjeta de reserva
const BookingCard = ({ booking }: BookingCardProps) => {

    const { updateBooking } = useBooking()
    const { user } = useAuth()

    const isTechnician = useMemo(() => {
        return user?.technician
    }, [user])

    // Funciones para manejar acciones
    const handleAcceptBooking = async (bookingId: number) => {
        try {
            await updateBooking(bookingId, { ...booking, status: "Aceptado" as const })
            enqueueSnackbar("Reserva aceptada", {
                variant: "success",
                autoHideDuration: 3000,
            })
        } catch (error) {
            console.error("Error al aceptar la reserva:", error)
            enqueueSnackbar("Error al aceptar la reserva", {
                variant: "error",
                autoHideDuration: 3000,
            })
        }
    }

    const handleRejectBooking = async (bookingId: number) => {
        try {
            await updateBooking(bookingId, { ...booking, status: "Rechazado" as const })
            enqueueSnackbar("Reserva rechazada con éxito", {
                variant: "success",
                autoHideDuration: 3000,
            })
        } catch (error) {
            console.error("Error al rechazar la reserva:", error)
            enqueueSnackbar("Error al rechazar la reserva", {
                variant: "error",
                autoHideDuration: 3000,
            })
        }
    }
    const handleCompleteBooking = async (bookingId: number) => {
        try {
            await updateBooking(bookingId, { ...booking, status: "Completado" as const })
            enqueueSnackbar("Reserva completada", {
                variant: "success",
                autoHideDuration: 3000,
            })

        } catch (error) {
            console.error("Error al completar la reserva:", error)
            enqueueSnackbar("Error al completar la reserva", {
                variant: "error",
                autoHideDuration: 3000,
            })
        }
    }

    const getStatusBadge = (status: BookingStatus) => {
        switch (status) {
            case "Pendiente":
                return <Badge variant="outline" > Pendiente </Badge>
            case "Aceptado":
                return <Badge className="bg-blue-100 text-blue-800" > Aceptada </Badge>
            case "Completado":
                return <Badge className="bg-green-100 text-green-800" > Completada </Badge>
            case "Rechazado":
                return <Badge className="bg-red-100 text-red-800" > Rechazada </Badge>
        }
    }
    return (
        <Card className="mt-5" key={booking.id}>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div>
                            <CardTitle className="text-2xl">{booking.user.firstName} {booking.user.lastName}</CardTitle>
                            <p className="text-lg text-muted-foreground">{booking.id}</p>
                        </div>
                    </div>
                    {getStatusBadge(booking.status as BookingStatus)}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-xl mb-8">{booking.comment}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(booking.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Hora de la reserva</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {booking.user.phone || "Teléfono del cliente no disponible"}
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {booking.user.email || "Email del cliente no disponible"}
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {booking.user.address || "Dirección del cliente no disponible"}
                    </div>
                </div>

                {/* Acciones según el estado */}
                {booking.status === "Pendiente" && isTechnician && (
                    <div className="flex gap-2 pt-2">
                        <Button size="sm" onClick={() => handleAcceptBooking(booking.id)}>
                            <Check className="h-4 w-4 mr-2" />
                            Aceptar
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleRejectBooking(booking.id)}>
                            <X className="h-4 w-4 mr-2" />
                            Rechazar
                        </Button>
                    </div>
                )}

                {booking.status === "Aceptado" && isTechnician && (
                    <div className="flex gap-2 pt-2">
                        <Button size="sm" onClick={() => handleCompleteBooking(booking.id)}>
                            <Check className="h-4 w-4 mr-2" />
                            Marcar como completado
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default BookingCard