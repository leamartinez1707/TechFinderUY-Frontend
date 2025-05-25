import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useUsers } from "@/context/UsersContext";
import { searchDirectionLatLon } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { enqueueSnackbar } from "notistack";

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
    const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
    const [direccion, setDireccion] = useState(userDirection);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { updateLocationData } = useUsers()
    const { user } = useAuth()

    const handleConfirmLocation = async () => {
        if (!ubicacionBuscada || !direccion) return;

        const locationData = {
            latitude: ubicacionBuscada[0],
            longitude: ubicacionBuscada[1],
            address: direccion,
        };

        if (user) {
            try {
                await updateLocationData(user.id, locationData);
                enqueueSnackbar("Ubicación actualizada correctamente", { variant: "success" });
            } catch (error) {
                enqueueSnackbar("Error al actualizar la ubicación", { variant: "error" });
            }
        }

        setUbicacionActual(ubicacionBuscada);
        setMapCenter(ubicacionBuscada); // ✅ Forzamos el centro del mapa
        setDireccion(locationData.address);
        setShowConfirmation(false);

        setTimeout(() => {
            setUbicacionBuscada(null); // limpiamos el marcador rojo después de centrar
        }, 300);
    };


    const handleCancelLocation = () => {
        setUbicacionActual(ubicacionAnterior);
        setDireccion(userDirection);
        setShowConfirmation(false);
    }

    useEffect(() => {
        const obtenerUbicacionTecnico = async () => {
            const geoLocation = await searchDirectionLatLon(userDirection!)
            if (!geoLocation) {
                setError("Dirección no encontrada");
            } else {
                const coords: [number, number] = [geoLocation.lat, geoLocation.long];
                setUbicacionActual(coords);
                setUbicacionAnterior(coords);
                setMapCenter(coords); // Centramos el mapa al cargar
            }
        };
        obtenerUbicacionTecnico();
    }, []);

    // Buscar dirección y actualizar mapa
    const buscarDireccion = async (direccion: string) => {
        if (!direccion) return;
        try {
            const geoLocation = await searchDirectionLatLon(direccion)
            if (!geoLocation) {
                setError("Dirección no encontrada");
            } else {
                setUbicacionActual([geoLocation.lat, geoLocation.long]);
                setUbicacionBuscada([geoLocation.lat, geoLocation.long]);
            }
            setShowConfirmation(true);
        } catch {
            enqueueSnackbar("Error al buscar la dirección", { variant: "error" });
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
            {mapCenter ? (
                <MapContainer
                    center={mapCenter}
                    zoom={13}
                    className="w-full h-96 mt-4 z-10 relative"
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <ChangeView center={mapCenter} />
                    {ubicacionActual && <Marker position={ubicacionActual} icon={icon}><Popup>Tu ubicación</Popup></Marker>}
                    {ubicacionBuscada && <Marker position={ubicacionBuscada} icon={iconRed}><Popup>Dirección buscada</Popup></Marker>}
                </MapContainer>
            ) : <p>Cargando mapa..</p>}


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
