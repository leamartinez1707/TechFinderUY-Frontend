import { useState, useEffect, JSX, useRef } from "react"
import { Search, MapPin, Filter, RouteIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import "leaflet/dist/leaflet.css"
import { capitalizeFirstLetter, specialization, professions } from "@/utils"
import { calculateDistance } from "@/lib/utils"
import { useUsers } from "@/context/UsersContext"
import type { Technicians } from "@/types"
import ModalUi from "@/components/modal/ModalUi"
import MobileTechInfo from "./dashboard/MobileTechInfo"
import UserMap from "./dashboard/UserMap"
import FormBooking from "../bookings/FormBooking"
import { useBookingHandler } from "@/hooks/useBookingHandler"

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

    // Estado para controlar si se muestra el drawer de filtros en móvil
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false)

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
            {/* Barra de búsqueda */}
            <h1 className="text-3xl font-bold mb-4 mx-4">Mapa de busqueda</h1>
            <div>
                <p className="mx-4 mb-4 md:text-lg text-muted-foreground">
                    Aquí puedes buscar y contactar a técnicos cercanos para reparar tus dispositivos electrónicos.
                </p>
                <p className="mx-4 mb-4  md:text-lg text-muted-foreground">
                    Utiliza la barra de búsqueda para encontrar técnicos por nombre o tipo de servicio que precises, y filtra especialización de ser necesario.
                </p>
                <p className="mx-4 mb-4  md:text-lg text-muted-foreground">
                    En el mapa podrás ver la ubicación de los técnicos más cercanos a ti, y podrás contactar con ellos realizando una reserva.
                </p>
            </div>
            <div className="p-4 bg-white shadow-sm z-10">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Buscar servicios técnicos..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Filtros para pantallas medianas y grandes */}
                        <div className="hidden md:flex gap-2">
                            <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Especialización" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas</SelectItem>
                                    {specialization.map((spec, index) => (
                                        <SelectItem key={index} value={spec.nombre}>
                                            {spec.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Botón de filtros para móviles */}
                        <div className="md:hidden">
                            <Dialog open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-full">
                                        <Filter className="h-4 w-4 mr-2" />
                                        Filtros
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Filtros</DialogTitle>
                                    </DialogHeader>
                                    <div className="p-4 space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Especialización</label>
                                            <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Especialización" />
                                                </SelectTrigger>
                                                <SelectContent className="z-[9999] max-h-[200px] md:max-h-auto" side="bottom" align="start">
                                                    <SelectGroup>
                                                        <SelectItem value="all">Todas</SelectItem>
                                                        {professions.map((spec, index) => (
                                                            <SelectItem key={index} value={spec.nombre}>
                                                                {spec.nombre}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Button className="w-full" onClick={() => setIsFilterDrawerOpen(false)}>
                                            Aplicar filtros
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="flex flex-col md:flex-row h-auto min-h-screen md:h-[800px]">
                {/* Lista de técnicos */}
                <div className="w-full md:w-1/3 p-4 overflow-y-auto max-h-[60vh] md:max-h-none">

                    <h2 className="text-xl font-bold mb-4">Técnicos cercanos</h2>

                    {filteredTechnicians.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No se encontraron técnicos que coincidan con tu búsqueda
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredTechnicians.map((tech) => (
                                <Card
                                    key={tech.id}
                                    className={`cursor-pointer transition-all ${selectedTechnician?.id === tech.id ? "ring-2 ring-primary" : ""}`}
                                    onClick={() => {
                                        const marker = markerRefs.current[tech.id];
                                        if (marker) {
                                            marker.openPopup(); // Esto abre el popup en el mapa
                                        }
                                        setSelectedTechnician(tech)
                                        setCenterMapLocation([Number.parseFloat(tech.latitude), Number.parseFloat(tech.longitude)])
                                    }}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold capitalize">
                                                    {tech.firstName} {tech.lastName}
                                                </h3>
                                                <p className="text-sm text-muted-foreground capitalize">{tech.specialization}</p>
                                            </div>
                                        </div>

                                        <div className="mt-2">
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {tech.services.map((service, index) => (
                                                    <Badge key={index} variant="secondary" className="text-xs">
                                                        {capitalizeFirstLetter(service)}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-center mt-3 text-sm">
                                            <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                                            <span className="text-muted-foreground truncate">{tech.address}</span>
                                        </div>
                                        <div className="flex items-center mt-2 text-sm">
                                            <RouteIcon className="h-3 w-3 mr-1 text-muted-foreground" />
                                            <span className="text-muted-foreground truncate">A {tech.distance?.toString().substring(0, 5)} Kilometros</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
                {/* Mapa */}
                <div className="w-full md:w-2/3 h-[300px] md:h-screen relative z-0">
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

