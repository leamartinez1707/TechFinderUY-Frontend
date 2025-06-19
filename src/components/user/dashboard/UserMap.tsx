import { Dispatch, JSX, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { Technicians } from '@/types'
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import DashboardCard from '../card/DashboardCard'

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
        <MapContainer
            center={centerMapLocation} zoom={15} className="w-full h-full z-0 relative" zoomControl={false}>
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
                    <Popup className="hidden md:block">
                        <DashboardCard
                            tech={{
                                ...tech,
                            }}
                            setAddBookingModal={setAddBookingModal}
                        />
                    </Popup>
                </Marker>
            ))}
            <SetViewOnUserLocation userLocation={centerMapLocation} />
        </MapContainer>
    )
}

export default UserMap