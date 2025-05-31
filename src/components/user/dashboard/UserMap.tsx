import { Dispatch, JSX, useEffect } from 'react'
import { capitalizeFirstLetter } from '@/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, RouteIcon, Book, Contact } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { Technicians } from '@/types'
import L from 'leaflet'
import "leaflet/dist/leaflet.css"

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

type UserMapProps = {
    centerMapLocation: [number, number];
    userLocation: [number, number];
    filteredTechnicians: (Technicians & { distance?: number; })[]
    setSelectedTechnician: Dispatch<React.SetStateAction<Technicians | null>>
    setAddBookingModal: Dispatch<React.SetStateAction<boolean>>
    setCenterMapLocation: (value: React.SetStateAction<[number, number] | null>) => void
    markerRefs: React.RefObject<{
        [key: string]: L.Marker | null;
    }>
}

const UserMap = ({ centerMapLocation, userLocation, filteredTechnicians, setSelectedTechnician, setAddBookingModal, setCenterMapLocation, markerRefs }: UserMapProps) => {

    useEffect(() => {
    }, [userLocation, centerMapLocation])

    return (
        <div className='w-full h-[300px] md:h-full p-4 md:p-0'>
            <MapContainer
                center={centerMapLocation} zoom={2} className="w-full h-full z-0 relative" zoomControl={false}>
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
                        ref={(ref) => {
                            markerRefs.current[tech.id] = ref;
                        }}
                        eventHandlers={{
                            click: () => {
                                setSelectedTechnician(tech)
                                setAddBookingModal(false) // Cierra el modal de reserva al seleccionar un técnico
                                setCenterMapLocation([Number.parseFloat(tech.latitude), Number.parseFloat(tech.longitude)])
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
                                <div className="mt-2 flex justify-center items-center gap-2">
                                    <Button
                                        onClick={() => setAddBookingModal(true)}
                                        className="flex-1"
                                    >
                                        <Book className="h-4 w-4 mr-1" />
                                        Enviar reserva
                                    </Button>
                                    <Button className="flex-1">
                                        <Contact className="h-4 w-4 mr-1" />
                                        Ver Perfil
                                    </Button>
                                </div>
                            </Popup>
                        </div>
                    </Marker>
                ))}
                <SetViewOnUserLocation userLocation={centerMapLocation} />
            </MapContainer>
        </div>
    )
}

export default UserMap