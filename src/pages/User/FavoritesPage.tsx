import { Button } from "@/components/ui/button"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useUsers } from "@/context/UsersContext"
import { capitalizeFirstLetter } from "@/utils"
import { Card, CardContent } from "@mui/material"
import { Calendar, Star, Trash2 } from "lucide-react"
import { useState } from "react"
import ModalUi from "@/components/modal/ModalUi"
import FormBooking from "@/components/bookings/FormBooking"
import { useBookingHandler } from "@/hooks/useBookingHandler"

// This would typically come from your database

const FavoritesPage = () => {

    const { technicians } = useUsers()

    const [favorites, setFavorites] = useState(technicians);

    const removeFavorite = (techId: number) => {
        setFavorites(favorites.filter(tech => tech.id !== techId));
    };

    const {
        setBookingData,
        selectedTechnician,
        setSelectedTechnician,
        addBookingModal,
        setAddBookingModal,
        handleAddBooking,

    } = useBookingHandler();

    if (favorites.length === 0) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-12">
                    <div className="text-center max-w-md mx-auto">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                            <Star className="h-6 w-6 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight mb-2">No hay técnicos en favoritos</h1>
                        <p className="text-muted-foreground mb-6">
                            Aún no has agregado técnicos a tu lista de favoritos. Explora los técnicos disponibles y agrégalos a tus favoritos para un acceso rápido.
                        </p>
                        <Button>Buscar Técnicos</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center gap-4 mb-8">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Star className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Técnicos favoritos</h1>
                        <p className="text-muted-foreground">Acceso rápido hacía tus técnicos favoritos</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((tech) => (
                        <Card key={tech.id} className="overflow-hidden">
                            {/* <CardHeader className="relative p-0">
                                <div className="aspect-video w-full overflow-hidden">
                                    <img
                                        src={tech.imageUrl}
                                        alt={tech.name}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </CardHeader> */}
                            <CardContent className="p-6 h-full">
                                <div className="flex flex-col justify-between h-full">


                                    <CardDescription className="mb-4">
                                        <CardTitle className="text-xl mb-2 text-black capitalize">{tech.firstName} {tech.lastName}</CardTitle>
                                        <div className="flex items-center gap-1 mb-1">
                                            <span className="font-medium text-gray-800 capitalize">{tech.specialization}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1 mt-2 mb-4">
                                            {tech.services.map((service, index) => (
                                                <Badge key={index} className="text-xs">
                                                    {capitalizeFirstLetter(service)}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="flex items-center">
                                                {tech.phone}
                                            </span>
                                            <span className="text-muted-foreground">•</span>
                                            <span className="text-muted-foreground capitalize">{tech.address}</span>
                                        </div>
                                        <span className="text-muted-foreground">{capitalizeFirstLetter(tech.email)}</span>
                                    </CardDescription>

                                    <div className="flex gap-3">
                                        <Button
                                            className="flex-1"
                                            onClick={() => {
                                                setSelectedTechnician(tech);
                                                setAddBookingModal(true)
                                            }}
                                        >
                                            <Calendar className="h-4 w-4 mr-2" />
                                            Schedule
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="text-destructive hover:text-destructive"
                                            onClick={() => removeFavorite(tech.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <ModalUi
                open={addBookingModal}
                setOpen={setAddBookingModal}
                firstName={selectedTechnician?.firstName}
                lastName={selectedTechnician?.lastName}>
                <FormBooking
                    handleAddBooking={handleAddBooking}
                    setBookingData={setBookingData}
                    setAddBookingModal={setAddBookingModal}
                />
            </ModalUi>
        </div>
    );
}

export default FavoritesPage