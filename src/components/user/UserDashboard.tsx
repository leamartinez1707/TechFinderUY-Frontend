import { useState, useEffect, JSX } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { Search, MapPin, Phone, Mail, Filter, X } from "lucide-react"
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
import type { Technicians } from "@/types"

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
    // Estado para la ubicación del usuario
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
    const [route, setRoute] = useState<[number, number][]>([]);
    // Estado para el término de búsqueda
    const [searchTerm, setSearchTerm] = useState<string>("")

    // Estado para el filtro de especialización
    const [specializationFilter, setSpecializationFilter] = useState<string>("")

    // Estado para el técnico seleccionado
    const [selectedTechnician, setSelectedTechnician] = useState<Technicians | null>(null)

    // Estado para controlar si se muestra el drawer de filtros en móvil
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false)

    // Datos de ejemplo de técnicos
    const [technicians, setTechnicians] = useState<Technicians[]>(techniciansInfo)

    // Obtener la ubicación del usuario al cargar la página
    useEffect(() => {

        // TAREA: Utilizar la ubicacion del usuario logueado para mostrar ubicacion actual
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    setUserLocation([latitude, longitude])

                    // Calcular la distancia de cada técnico a la ubicación del usuario
                    const techsWithDistance = technicians.map((tech) => {
                        const techLat = Number.parseFloat(tech.latitude)
                        const techLng = Number.parseFloat(tech.longitude)
                        const distance = calculateDistance(latitude, longitude, techLat, techLng)
                        return { ...tech, distance }
                    })

                    // Ordenar técnicos por distancia
                    techsWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0))
                    setTechnicians(techsWithDistance)
                },
                (error) => {
                    console.error("Error obteniendo la ubicación:", error)
                    // Usar una ubicación por defecto (por ejemplo, centro de Montevideo)
                    // setUserLocation([-34.9011, -56.1645])
                },
            )
        }
    }, [])

    useEffect(() => {
        // const startPoint = { lat: latitude, lng: longitude }
        // const endPoint = { lat: techLat, lng: techLng }
        // const routeDistance = await getRouteDistance(startPoint, endPoint)
        // console.log("Distancia de ruta en vehiculo:", routeDistance)
        // const coordinates = routeDistance?.routes[0].geometry.coordinates.map(
        //     ([lng, lat]: [number, number]) => [lat, lng] // Leaflet usa lat, lng
        // );
        // setRoute(coordinates);

    }, [])

    // Filtrar técnicos según los criterios de búsqueda
    const removeAccents = (str: string) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const filteredTechnicians = technicians.filter((tech) => {
        const normalizedSearchTerms = removeAccents(searchTerm).split(/\s+/).filter(Boolean); // Divide la búsqueda en palabras clave
        const normalizedName = removeAccents(`${tech.firstName} ${tech.lastName}`);
        const normalizedServices = tech.services.map(removeAccents);

        // Verificar si todas las palabras de búsqueda están en algún campo del técnico
        const searchMatch = normalizedSearchTerms.every((word) =>
            normalizedName.includes(word) ||
            normalizedServices.some(service => service.includes(word))
        );

        // Filtrar por especialización
        const specializationMatch = specializationFilter === "all" || specializationFilter === "" || tech.specialization.toLowerCase() === specializationFilter.toLowerCase();

        return searchMatch && specializationMatch;
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

    return (
        <div className="flex flex-col h-screen my-20">
            {/* Barra de búsqueda */}
            <h1 className="text-3xl font-bold mb-8 mx-4">Panel de usuario</h1>
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
                                    onClick={() => setSelectedTechnician(tech)}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold capitalize">
                                                    {tech.firstName} {tech.lastName}
                                                </h3>
                                                <p className="text-sm text-muted-foreground capitalize">{tech.specialization}</p>
                                            </div>
                                            {/* {tech.distance !== undefined && (
                                                <Badge variant="outline" className="ml-2">
                                                    {tech.distance.toFixed(1)} km
                                                </Badge>
                                            )} */}
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
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
                {/* Mapa */}
                <div className="flex-grow min-h-56 h-[800px] md:h-[800px] z-0">
                    {userLocation && (
                        <MapContainer
                            center={userLocation} zoom={13} style={{ height: "100%", width: "100%" }} className="h-full" zoomControl={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {/* Marcador para la ubicación del usuario */}
                            <Marker position={userLocation} icon={iconRed}>
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
                                            <h3 className="font-bold capitalize">
                                                {tech.firstName} {tech.lastName}
                                            </h3>
                                            <p className="text-sm capitalize">{tech.specialization}</p>
                                            {/* {tech.distance !== undefined && (
                                                <p className="text-xs mt-1">A {tech.distance.toFixed(1)} km de ti</p>
                                            )} */}
                                            <div className="mt-2 flex justify-center gap-2">
                                                <Button size="sm" variant="outline" asChild>
                                                    <a href={`tel:${tech.phone}`}>
                                                        <Phone className="h-3 w-3 mr-1" />
                                                        Llamar
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
                            <SetViewOnUserLocation userLocation={userLocation} />
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
                                <p className="text-sm text-muted-foreground">{selectedTechnician.specialization}</p>
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
                            <Button className="flex-1" asChild>
                                <a href={`tel:${selectedTechnician.phone}`}>
                                    <Phone className="h-4 w-4 mr-2" />
                                    Llamar
                                </a>
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
        </div >
    )
}

