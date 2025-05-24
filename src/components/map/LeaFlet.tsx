import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useUsers } from "@/context/UsersContext";
import { searchDirectionLatLon } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

// Icono personalizado
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

// Componente para mover el mapa cuando cambian las coordenadas
const ChangeView: React.FC<{ center: [number, number] }> = ({ center }) => {
    const map = useMap();
    map.setView(center, 15); // Mueve el mapa a la nueva ubicación
    return null;
};

type LeafletMapProps = {
    userDirection?: string;
};

const LeafletMap = ({ userDirection }: LeafletMapProps) => {
    const [ubicacionActual, setUbicacionActual] = useState<[number, number] | null>(null);
    const [ubicacionBuscada, setUbicacionBuscada] = useState<[number, number] | null>(null);
    const [ubicacionAnterior, setUbicacionAnterior] = useState<[number, number] | null>(null);
    const [direccion, setDireccion] = useState(userDirection);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { updateLocationData } = useUsers()
    const { user } = useAuth()

    const handleConfirmLocation = async () => {
        // Aquí podrías guardar la dirección confirmada en un estado o enviarla al backend
        const locationData = {
            latitude: ubicacionBuscada![0],
            longitude: ubicacionBuscada![1],
            address: direccion!,
        };
        if (user) {
            await updateLocationData(user.id, locationData);
        }
        setDireccion(locationData.address);
        setUbicacionBuscada(null);
        setShowConfirmation(false);
    };

    const handleCancelLocation = () => {
        setUbicacionActual(ubicacionAnterior);
        setDireccion(userDirection);
        setShowConfirmation(false);
    }

    useEffect(() => {
        const obtenerUbicacionTecnico = async () => {
            const geoLocation = await searchDirectionLatLon(userDirection!)
            console.log("Ubicación del técnico: ", geoLocation);
            if (!geoLocation) {
                setError("Dirección no encontrada");
            } else {
                setUbicacionActual([geoLocation.lat, geoLocation.long]);
                setUbicacionAnterior([geoLocation.lat, geoLocation.long]);
            }
        };
        obtenerUbicacionTecnico();
    }, [userDirection]);

    // useEffect(() => {
    //     const obtenerUbicacion = () => {
    //         // Intentamos obtener la ubicación con la mayor precisión posible
    //         navigator.geolocation.getCurrentPosition(
    //             (pos) => {
    //                 console.log("Ubicación obtenida: ", pos);
    //                 setUbicacionBuscada([pos.coords.latitude, pos.coords.longitude]);
    //                 setError(null); // Resetear error si la ubicación es obtenida correctamente
    //             },
    //             (err) => {
    //                 console.error("Error al obtener la ubicación: ", err);
    //                 setError("No se pudo obtener la ubicación del usuario. Intenta habilitar los permisos.");
    //             },
    //             {
    //                 enableHighAccuracy: true,  // Habilitamos la mayor precisión posible
    //                 timeout: 10000,  // Tiempo de espera máximo (10 segundos)
    //                 maximumAge: 0,  // No usar una ubicación cacheada
    //             }
    //         );
    //     };
    //     obtenerUbicacion();
    // }, []);

    // Buscar dirección y actualizar mapa
    const buscarDireccion = async (direccion: string) => {
        if (!direccion) return;
        try {
            const geoLocation = await searchDirectionLatLon(direccion)
            if (!geoLocation) {
                setError("Dirección no encontrada");
            } else {
                setUbicacionActual([geoLocation.lat, geoLocation.long]);
            }
            setShowConfirmation(true);
        } catch {
            setError("Error al buscar la dirección");
        }
    };




    return (
        <div className="flex flex-col items-center w-full z-0">
            <div className="w-full flex gap-2">
                <input
                    type="text"
                    defaultValue={""}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Ingresa tu dirección"
                    className="border p-2 flex-1 rounded-md"
                />
                <button
                    onClick={() => buscarDireccion(direccion!)}
                    className="bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-blue-600"
                >
                    Buscar
                </button>
            </div>
            <MapContainer
                center={ubicacionBuscada || [0, 0]}
                zoom={13}
                className="w-full h-96 mt-4 z-10 relative"
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* Mueve el mapa cuando cambia la ubicación */}
                {ubicacionActual && <ChangeView center={ubicacionActual} />}
                {/* Marcadores para las ubicaciones */}
                {ubicacionActual && <Marker position={ubicacionActual} icon={icon}><Popup>Tu ubicación</Popup></Marker>}
                {ubicacionBuscada && <Marker position={ubicacionBuscada} icon={iconRed}><Popup>Dirección buscada</Popup></Marker>}
            </MapContainer>
            {error && <p className="text-red-500">{error}</p>}
            {showConfirmation && (
                <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Desea confirmar la dirección?</DialogTitle>
                            <DialogDescription className="text-md">
                                {direccion}
                            </DialogDescription>
                        </DialogHeader>
                        <Button
                            variant="outline"
                            className="bg-green-500 hover:bg-green-700 hover:text-white text-white px-4 py-2 rounded hover:cursor-pointer"
                            onClick={handleConfirmLocation}
                        >
                            Confirmar
                        </Button>
                        <Button
                            variant="outline"
                            className="bg-red-500 hover:bg-red-700 hover:text-white text-white px-4 py-2 rounded hover:cursor-pointer"
                            onClick={handleCancelLocation}
                        >
                            Cancelar
                        </Button>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default LeafletMap;
