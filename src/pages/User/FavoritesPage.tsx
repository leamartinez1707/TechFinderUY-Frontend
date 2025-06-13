import { Button } from "@/components/ui/button"
import { useUsers } from "@/context/UsersContext"
import ModalUi from "@/components/modal/ModalUi"
import FormBooking from "@/components/bookings/FormBooking"
import { useBookingHandler } from "@/hooks/useBookingHandler"
import TechCard from "@/components/user/card/TechCard"
import { Star } from "lucide-react"
import { useNavigate } from "react-router-dom"

const FavoritesPage = () => {

    const { favorites } = useUsers()

    const navigate = useNavigate();

    const {
        setBookingData,
        selectedTechnician,
        setSelectedTechnician,
        addBookingModal,
        setAddBookingModal,
        handleAddBooking,

    } = useBookingHandler();

    if (favorites.length === 0 || !favorites) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-12">
                    <div className="text-center max-w-md mx-auto">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full mb-4">
                            <Star className="size-14 fill-amber-400" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight mb-2">No hay técnicos en favoritos</h1>
                        <p className="text-muted-foreground mb-6">
                            Aún no has agregado técnicos a tu lista de favoritos. Explora los técnicos disponibles y agrégalos a tus favoritos para un acceso rápido.
                        </p>
                        <Button onClick={() => navigate('/mapa')}>Buscar Técnicos</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center gap-4 mb-8">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full">
                        <Star className="size-10 fill-amber-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Técnicos favoritos</h1>
                        <p className="text-muted-foreground">Acceso rápido hacía tus técnicos favoritos</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites?.map((tech) => (
                        <TechCard
                            key={tech?.technician?.id}
                            technician={tech}
                            setSelectedTechnician={setSelectedTechnician}
                            setAddBookingModal={setAddBookingModal}
                        />
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