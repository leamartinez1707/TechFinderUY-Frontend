import { useState, useEffect, JSX } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { Search, MapPin, Phone, Mail, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import L from "leaflet"

// Importar estilos de Leaflet
import "leaflet/dist/leaflet.css"

// Tipos
interface UserClass {
    id: number
    username: string
    firstName: string
    lastName: string
    email: string
    password: string
    phone: string
    address: string
    isActive: boolean
}

interface Technician {
    id: number
    specialization: string
    latitude: string
    longitude: string
    services: string[]
    user: UserClass
    distance?: number // Distancia calculada desde la ubicación del usuario
}

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
    // Estado para la ubicación del usuario
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null)

    // Estado para el término de búsqueda
    const [searchTerm, setSearchTerm] = useState<string>("")

    // Estado para el filtro de especialización
    const [specializationFilter, setSpecializationFilter] = useState<string>("")

    // Estado para el técnico seleccionado
    const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null)

    // Estado para controlar si se muestra el drawer de filtros en móvil
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false)

    // Datos de ejemplo de técnicos
    const [technicians, setTechnicians] = useState<Technician[]>([
        {
            id: 1,
            specialization: "Computación",
            latitude: "-34.8637982",
            longitude: "-56.2187700",
            services: ["técnico en reparación de computadoras"],
            user: {
                id: 1,
                username: "leandromart",
                firstName: "Leandro",
                lastName: "Martinez",
                email: "leandromart@hotmail.com",
                password: "$2b$10$sm8OzExqf0J1dMjbp2EliuTO5q4ot/mnhE1pmTyejdhqFHqpm0WjS",
                phone: "095220063",
                address: "Cayetano Rivas",
                isActive: true,
            },
        },
        {
            id: 2,
            specialization: "Celulares",
            latitude: "-34.8737982",
            longitude: "-56.2087700",
            services: ["técnico en reparación de celulares", "técnico en recuperación de datos"],
            user: {
                id: 2,
                username: "mariagomez",
                firstName: "María",
                lastName: "Gómez",
                email: "mariagomez@gmail.com",
                password: "$2b$10$sm8OzExqf0J1dMjbp2EliuTO5q4ot/mnhE1pmTyejdhqFHqpm0WjS",
                phone: "098765432",
                address: "Av. Italia 1234",
                isActive: true,
            },
        },
        {
            id: 3,
            specialization: "Redes",
            latitude: "-34.8537982",
            longitude: "-56.2287700",
            services: ["técnico en redes", "técnico en seguridad informática"],
            user: {
                id: 3,
                username: "carlosrodriguez",
                firstName: "Carlos",
                lastName: "Rodríguez",
                email: "carlos.rodriguez@gmail.com",
                password: "$2b$10$sm8OzExqf0J1dMjbp2EliuTO5q4ot/mnhE1pmTyejdhqFHqpm0WjS",
                phone: "099876543",
                address: "Bulevar Artigas 3456",
                isActive: true,
            },
        },
        {
            id: 4,
            specialization: "Computación",
            latitude: "-34.8837982",
            longitude: "-56.2387700",
            services: ["técnico en ensamblaje de computadoras", "técnico en instalación de software"],
            user: {
                id: 4,
                username: "anaperez",
                firstName: "Ana",
                lastName: "Pérez",
                email: "ana.perez@gmail.com",
                password: "$2b$10$sm8OzExqf0J1dMjbp2EliuTO5q4ot/mnhE1pmTyejdhqFHqpm0WjS",
                phone: "097654321",
                address: "Rivera 5678",
                isActive: true,
            },
        },
    ])

    // Lista de especializaciones disponibles
    const specializations = [...new Set(technicians.map((tech) => tech.specialization))]

    // Obtener la ubicación del usuario al cargar la página
    useEffect(() => {
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
                    setUserLocation([-34.9011, -56.1645])
                },
            )
        }
    }, [])

    // Función para calcular la distancia entre dos puntos (fórmula de Haversine)
    function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371 // Radio de la Tierra en km
        const dLat = deg2rad(lat2 - lat1)
        const dLon = deg2rad(lon2 - lon1)
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = R * c // Distancia en km
        return distance
    }

    function deg2rad(deg: number): number {
        return deg * (Math.PI / 180)
    }

    // Filtrar técnicos según los criterios de búsqueda
    const filteredTechnicians = technicians.filter((tech) => {
        // Filtrar por término de búsqueda
        const searchMatch =
            searchTerm === "" ||
            tech.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tech.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tech.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase()))

        // Filtrar por especialización
        const specializationMatch = specializationFilter === "" || tech.specialization === specializationFilter

        return searchMatch && specializationMatch
    })

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
        <div className="flex flex-col h-screen mt-20">
            {/* Barra de búsqueda */}
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
                                    {specializations.map((spec, index) => (
                                        <SelectItem key={index} value={spec}>
                                            {spec}
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
                                                <SelectContent>
                                                    <SelectItem value="all">Todas</SelectItem>
                                                    {specializations.map((spec, index) => (
                                                        <SelectItem key={index} value={spec}>
                                                            {spec}
                                                        </SelectItem>
                                                    ))}
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
            <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
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
                                                <h3 className="font-bold">
                                                    {tech.user.firstName} {tech.user.lastName}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">{tech.specialization}</p>
                                            </div>
                                            {tech.distance !== undefined && (
                                                <Badge variant="outline" className="ml-2">
                                                    {tech.distance.toFixed(1)} km
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="mt-2">
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {tech.services.map((service, index) => (
                                                    <Badge key={index} variant="secondary" className="text-xs">
                                                        {service}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-center mt-3 text-sm">
                                            <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                                            <span className="text-muted-foreground truncate">{tech.user.address}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Mapa */}
                <div className="flex-grow h-[300px] md:h-auto z-0">
                    {userLocation && (
                        <MapContainer center={userLocation} zoom={13} style={{ height: "100%", width: "100%" }} zoomControl={false}>
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
                                    <Popup>
                                        <div className="text-center">
                                            <h3 className="font-bold">
                                                {tech.user.firstName} {tech.user.lastName}
                                            </h3>
                                            <p className="text-sm">{tech.specialization}</p>
                                            {tech.distance !== undefined && (
                                                <p className="text-xs mt-1">A {tech.distance.toFixed(1)} km de ti</p>
                                            )}
                                            <div className="mt-2 flex justify-center gap-2">
                                                <Button size="sm" variant="outline" asChild>
                                                    <a href={`tel:${tech.user.phone}`}>
                                                        <Phone className="h-3 w-3 mr-1" />
                                                        Llamar
                                                    </a>
                                                </Button>
                                                <Button size="sm" variant="outline" asChild>
                                                    <a href={`mailto:${tech.user.email}`}>
                                                        <Mail className="h-3 w-3 mr-1" />
                                                        Email
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}

                            {/* Componente para centrar el mapa en la ubicación del usuario */}
                            <SetViewOnUserLocation userLocation={userLocation} />
                        </MapContainer>
                    )}
                </div>
            </div>

            {/* Panel de información del técnico seleccionado (solo en móvil) */}
            {selectedTechnician && (
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg rounded-t-xl z-20">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold">
                                {selectedTechnician.user.firstName} {selectedTechnician.user.lastName}
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
                                    {service}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center mt-3 text-sm">
                        <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-muted-foreground">{selectedTechnician.user.address}</span>
                    </div>

                    <div className="flex gap-2 mt-4">
                        <Button className="flex-1" asChild>
                            <a href={`tel:${selectedTechnician.user.phone}`}>
                                <Phone className="h-4 w-4 mr-2" />
                                Llamar
                            </a>
                        </Button>
                        <Button variant="outline" className="flex-1" asChild>
                            <a href={`mailto:${selectedTechnician.user.email}`}>
                                <Mail className="h-4 w-4 mr-2" />
                                Email
                            </a>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

