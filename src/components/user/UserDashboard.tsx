import { useState, useEffect, JSX } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { Search, MapPin, Mail, Filter, X, Book, RouteIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { capitalizeFirstLetter, specialization, professions } from "@/utils"
import { calculateDistance } from "@/lib/utils"
import { useUsers } from "@/context/UsersContext"
import type { CreateBooking, Technicians } from "@/types"
import { useBooking } from "@/context/BookingContext"
import { useAuth } from "@/context/AuthContext"
import { enqueueSnackbar } from "notistack"
import ModalUi from "../modal/ModalUi"

// Componente para centrar el mapa en la ubicación del usuario
function SetViewOnUserLocation({ userLocation }: { userLocation: [number, number] | null }): JSX.Element | null {
    const map = useMap()

    useEffect(() => {
        if (userLocation) {
            map.setView(userLocation, 13)
        }
    }, [userLocation, map])

    return null
}

// Componente principal
export default function UserDashboard(): JSX.Element {

    const { technicians: techniciansInfo } = useUsers()
    const { user } = useAuth()
    const { addBooking } = useBooking()
    // Estado para la ubicación del usuario
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
    const [centerMapLocation, setCenterMapLocation] = useState<[number, number] | null>(null)

    const [addBookingModal, setAddBookingModal] = useState<boolean>(false)
    const [bookingData, setBookingData] = useState<CreateBooking | null>(null)

    // Estado para el término de búsqueda
    const [searchTerm, setSearchTerm] = useState<string>("")

    // Estado para el filtro de especialización
    const [specializationFilter, setSpecializationFilter] = useState<string>("")

    // Estado para el técnico seleccionado
    const [selectedTechnician, setSelectedTechnician] = useState<Technicians | null>(null)

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

    const icon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
        iconSize: [35, 35],
        iconAnchor: [17, 35],
    });
    const iconRed = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/9131/9131546.png",
        iconSize: [35, 35],
        iconAnchor: [17, 35],
    });

    // Función para manejar la reserva
    const handleAddBooking = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!selectedTechnician) return;
            const booking: CreateBooking = {
                technician: selectedTechnician.id,
                comment: bookingData?.comment || "",
                date: bookingData?.date || "",
                user: user?.id || 0,
                status: "Pendiente",
            };
            await addBooking(booking);
            enqueueSnackbar("Reserva enviada correctamente", { variant: "success" });
            setAddBookingModal(false);
            setSelectedTechnician(null);

        } catch (error) {
            console.error("Error al enviar la reserva:", error);
            enqueueSnackbar("Hubo un error al enviar la reserva, intente nuevamente", { variant: "error" })
        }
    }
    return (
        <div className="flex flex-col h-screen my-20">
            {/* Barra de búsqueda */}
            <h1 className="text-3xl font-bold mb-4 mx-4">Panel de usuario</h1>
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
            <div className="flex flex-col md:flex-row flex-grow overflow-hidden min-h-96">
                {/* Lista de técnicos */}
                <div className="w-full md:w-1/3 p-4 overflow-y-auto">
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
                                            <span className="text-muted-foreground truncate">A {tech.distance?.toString().substring(0, 5)} Kilometros2</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
                {/* Mapa */}
                <div className="flex-grow min-h-56 h-[800px] md:h-[800px] z-0">
                    {centerMapLocation && (
                        <MapContainer
                            center={centerMapLocation} zoom={2} style={{ height: "100%", width: "100%" }} className="h-full" zoomControl={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {/* Marcador para la ubicación del usuario */}
                            <Marker position={userLocation!} icon={iconRed}>
                                <Popup>Tu ubicación actual</Popup>
                            </Marker>

                            {/* Marcadores para los técnicos */}
                            {filteredTechnicians.map((tech) => (
                                <Marker
                                    key={tech.id}
                                    position={[Number.parseFloat(tech.latitude), Number.parseFloat(tech.longitude)]}
                                    icon={icon}
                                    eventHandlers={{
                                        click: () => {
                                            setSelectedTechnician(tech)
                                        },
                                    }}
                                >
                                    <div className="text-center hidden md:block">
                                        <Popup className="hidden md:block">
                                            <h3 className="font-bold md:text-lg capitalize">
                                                {tech.firstName} {tech.lastName}
                                            </h3>
                                            <p className="text-base capitalize">{tech.specialization}</p>
                                            <div className="mt-2 flex flex-wrap gap-1">
                                                {tech.services.map((service, index) => (
                                                    <Badge key={index} variant="secondary" className="text-xs">
                                                        {capitalizeFirstLetter(service)}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div className="mt-2 flex items-center text-sm">
                                                <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                                                <span className="text-muted-foreground">{tech.address}</span>
                                            </div>
                                            <div className="flex items-center mt-2 text-sm">
                                                <RouteIcon className="h-3 w-3 mr-1 text-muted-foreground" />
                                                <span className="text-muted-foreground truncate">A {tech.distance?.toString().substring(0, 5)} Kilometros</span>
                                            </div>
                                            <div className="mt-2 flex justify-center gap-2">
                                                <Button size="sm" variant="outline" asChild>
                                                    <a href={`tel:${tech.phone}`}>
                                                        <Book className="h-3 w-3 mr-1" />
                                                        Enviar reserva
                                                    </a>
                                                </Button>
                                                <Button size="sm" variant="outline" asChild>
                                                    <a href={`mailto:${tech.email}`}>
                                                        <Mail className="h-3 w-3 mr-1" />
                                                        Email
                                                    </a>
                                                </Button>
                                            </div>
                                        </Popup>
                                    </div>
                                </Marker>
                            ))}

                            {/* Componente para centrar el mapa en la ubicación del usuario */}
                            <SetViewOnUserLocation userLocation={centerMapLocation} />
                        </MapContainer>
                    )}
                </div>
            </div>

            {/* Panel de información del técnico seleccionado (solo en móvil) */}
            {
                selectedTechnician && (
                    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg rounded-t-xl z-20 md:w-1/3 md:right-10 md:left-auto">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold capitalize">
                                    {selectedTechnician.firstName} {selectedTechnician.lastName}
                                </h3>
                                <p className="text-sm text-muted-foreground capitalize">{selectedTechnician.specialization}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setSelectedTechnician(null)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="mt-2">
                            <div className="flex flex-wrap gap-1 mt-2">
                                {selectedTechnician.services.map((service, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                        {capitalizeFirstLetter(service)}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center mt-3 text-sm">
                            <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-muted-foreground">{selectedTechnician.address}</span>
                        </div>

                        <div className="flex gap-2 mt-4">
                            <Button
                                onClick={() => setAddBookingModal(true)}
                                className="flex-1"
                            >
                                <Book className="h-4 w-4 mr-2" />
                                Enviar reserva
                            </Button>
                            <Button variant="outline" className="flex-1" asChild>
                                <a href={`mailto:${selectedTechnician.email}`}>
                                    <Mail className="h-4 w-4 mr-2" />
                                    Email
                                </a>
                            </Button>
                        </div>
                    </div>
                )
            }
            <ModalUi
                open={addBookingModal}
                setOpen={setAddBookingModal}
                title="Enviar reserva"
                description="Completa el formulario para enviar una reserva al técnico seleccionado."
                technicianId={selectedTechnician?.id}
            >
                <form
                    onSubmit={(e) => handleAddBooking(e)}
                    className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Descripción del problema"
                        required
                        onChange={(e) => setBookingData(prev => ({ ...prev!, comment: e.target.value }))}
                    />
                    <Input
                        type="date"
                        placeholder="Fecha preferida"
                        required
                        onChange={(e) => setBookingData(prev => ({ ...prev!, date: e.target.value }))}
                    />
                    <Button type="submit" className="w-full">
                        Enviar reserva
                    </Button>
                    <Button type="button" variant="outline" className="w-full" onClick={() => setAddBookingModal(false)}>
                        Cancelar
                    </Button>
                </form>
            </ModalUi>
        </div >
    )
}

