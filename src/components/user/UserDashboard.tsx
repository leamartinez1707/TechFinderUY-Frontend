import { useState, useEffect, JSX, useRef } from "react"
import FormBooking from "@/components/bookings/FormBooking"
import ModalUi from "@/components/modal/ModalUi"
import DashboardCard from "@/components/user/card/DashboardCard"
import MobileTechInfo from "@/components/user/dashboard/MobileTechInfo"
import UserMap from "@/components/user/dashboard/UserMap"
import { calculateDistance } from "@/lib/utils"
import { useBookingHandler } from "@/hooks/useBookingHandler"
import { useUsers } from "@/context/UsersContext"
import "leaflet/dist/leaflet.css"
import SearchFilters from "./dashboard/SearchFilters"
import type { Technicians } from "@/types"

// Componente principal
export default function UserDashboard(): JSX.Element {

    const { technicians: techniciansInfo } = useUsers()
    // Estado para la ubicación del usuario
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
    const [centerMapLocation, setCenterMapLocation] = useState<[number, number] | null>(null)

    // Estado para el término de búsqueda
    const [searchTerm, setSearchTerm] = useState<string>("")

    // Estado para el filtro de especialización
    const [specializationFilter, setSpecializationFilter] = useState<string>("")

    // Datos de ejemplo de técnicos
    const [technicians, setTechnicians] = useState<(Technicians & { distance?: number })[]>([])

    // 1. Ubicación del usuario
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                    setCenterMapLocation([latitude, longitude]);
                },
                (error) => {
                    console.error("Error obteniendo la ubicación:", error);
                    // Ubicación por defecto si falla
                    setUserLocation([-34.9011, -56.1645]); // Montevideo
                }
            );
        }
    }, []);

    // 2. Calcular distancia solo cuando tenemos userLocation y técnicos nuevos
    useEffect(() => {
        if (!userLocation || techniciansInfo.length === 0) return;

        const techsWithDistance = techniciansInfo.map((tech) => {
            const distance = calculateDistance(
                userLocation[0],
                userLocation[1],
                parseFloat(tech.latitude),
                parseFloat(tech.longitude)
            );
            return { ...tech, distance };
        });

        // Ordenar por cercanía
        techsWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));

        setTechnicians(techsWithDistance);
    }, [techniciansInfo, userLocation]);

    // Filtrar técnicos según los criterios de búsqueda
    const removeAccents = (str: string) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const filteredTechnicians = technicians.filter((tech) => {
        const normalizedName = removeAccents(`${tech.firstName} ${tech.lastName}`);
        const normalizedSpecialization = removeAccents(tech.specialization || "");
        const normalizedServices = tech.services.map(removeAccents);

        // Palabras clave normalizadas del input de búsqueda
        const searchWords = removeAccents(searchTerm).split(/\s+/).filter(Boolean);

        // Coincidencia con nombre o servicios
        const matchesSearch = searchWords.every((word) =>
            normalizedName.includes(word) ||
            normalizedServices.some(service => service.includes(word))
        );

        // Coincidencia con filtro de especialización
        const matchesSpecialization =
            specializationFilter === "all" ||
            specializationFilter === "" ||
            normalizedSpecialization === removeAccents(specializationFilter);

        return matchesSearch && matchesSpecialization;
    });

    const {
        setBookingData,
        selectedTechnician,
        setSelectedTechnician,
        addBookingModal,
        setAddBookingModal,
        handleAddBooking,
    } = useBookingHandler();

    const markerRefs = useRef<{ [key: string]: L.Marker | null }>({});
    return (
        <div className="flex flex-col min-h-screen my-20">
            <SearchFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                specializationFilter={specializationFilter}
                setSpecializationFilter={setSpecializationFilter}
            />

            {/* Contenido principal */}
            <div className="flex flex-col md:flex-row h-auto min-h-screen md:h-[800px]">
                {/* Lista de técnicos */}
                <div className="w-full md:w-1/3 p-4 overflow-y-auto max-h-[60vh] md:max-h-none">

                    <h2 className="text-xl font-bold mb-4">Técnicos encontrados</h2>

                    {filteredTechnicians.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No se encontraron técnicos que coincidan con tu búsqueda
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredTechnicians.map((tech) => (
                                <div
                                    key={tech.id}
                                    className={`cursor-pointer transition-all ${selectedTechnician?.id === tech.id ? "ring-2 ring-primary" : "ring-2 ring-primary/10"}`}
                                    onClick={() => {
                                        const marker = markerRefs.current[tech.id];
                                        if (marker) {
                                            marker.openPopup(); // Esto abre el popup en el mapa
                                        }
                                        setSelectedTechnician(tech)
                                        setCenterMapLocation([Number.parseFloat(tech.latitude), Number.parseFloat(tech.longitude)])
                                    }}
                                >
                                    <DashboardCard
                                        tech={tech}
                                        setAddBookingModal={setAddBookingModal}

                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {/* Mapa */}
                <div className="w-full md:w-2/3 h-[500px] md:h-[800px] relative z-0">
                    {centerMapLocation && (
                        <UserMap
                            userLocation={userLocation!}
                            filteredTechnicians={filteredTechnicians}
                            setSelectedTechnician={setSelectedTechnician}
                            setAddBookingModal={setAddBookingModal}
                            centerMapLocation={centerMapLocation}
                            setCenterMapLocation={setCenterMapLocation}
                            markerRefs={markerRefs}
                        />
                    )}
                </div>
                {/* Panel de información del técnico seleccionado (solo en móvil) */}
                {
                    selectedTechnician && (
                        <div className="md:hidden">
                            <MobileTechInfo
                                selectedTechnician={selectedTechnician}
                                setSelectedTechnician={setSelectedTechnician}
                                setAddBookingModal={setAddBookingModal}
                            />
                        </div>

                    )
                }
            </div>
            <ModalUi
                open={addBookingModal}
                setOpen={setAddBookingModal}
                firstName={selectedTechnician?.firstName}
                lastName={selectedTechnician?.lastName}
            >
                <FormBooking
                    handleAddBooking={handleAddBooking}
                    setBookingData={setBookingData}
                    setAddBookingModal={setAddBookingModal}
                />
            </ModalUi>
        </div >
    )
}

