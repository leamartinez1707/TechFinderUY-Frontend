import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Icono personalizado
const icon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [35, 35],
    iconAnchor: [17, 35],
});

// Componente para mover el mapa cuando cambian las coordenadas
const ChangeView: React.FC<{ center: [number, number] }> = ({ center }) => {
    const map = useMap();
    map.setView(center, 15); // Mueve el mapa a la nueva ubicación
    return null;
};

const LeafletMap = () => {
    const [ubicacion, setUbicacion] = useState<[number, number] | null>(null);
    const [direccion, setDireccion] = useState<string>("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [coordenadas, setCoordenadas] = useState<[number, number] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleConfirmLocation = () => {
        // Aquí podrías guardar la dirección confirmada en un estado o enviarla al backend
        setShowConfirmation(false);
    };

    const handleCancelLocation = () => {
        setUbicacion(null);
        setDireccion("");
        setCoordenadas(null);
        setShowConfirmation(false);
    }

    useEffect(() => {
        const obtenerUbicacion = () => {
            // Intentamos obtener la ubicación con la mayor precisión posible
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setUbicacion([pos.coords.latitude, pos.coords.longitude]);
                    setCoordenadas([pos.coords.latitude, pos.coords.longitude]);
                    setError(null); // Resetear error si la ubicación es obtenida correctamente
                },
                (err) => {
                    console.error("Error al obtener la ubicación: ", err);
                    setError("No se pudo obtener la ubicación del usuario. Intenta habilitar los permisos.");
                },
                {
                    enableHighAccuracy: true,  // Habilitamos la mayor precisión posible
                    timeout: 10000,  // Tiempo de espera máximo (10 segundos)
                    maximumAge: 0,  // No usar una ubicación cacheada
                }
            );
        };

        obtenerUbicacion();

    }, []);

    // Buscar dirección y actualizar mapa
    const buscarDireccion = async () => {
        if (!direccion) return;
        setError(null);

        try {
            const respuesta = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`
            );
            const data = await respuesta.json();

            if (data.length > 0) {
                setCoordenadas([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
            } else {
                setError("Dirección no encontrada");
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
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Ingresa tu dirección"
                    className="border p-2 flex-1 rounded-md"
                />
                <button
                    onClick={buscarDireccion}
                    className="bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-blue-600"
                >
                    Buscar
                </button>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {showConfirmation && (
                <div className="bg-white p-4 rounded-lg shadow-lg absolute top-0 mt-20">
                    <p>¿Confirmas esta dirección?</p>
                    <div className=" flex justify-end gap-2 mt-2">
                        <button type="button" onClick={handleCancelLocation} className="bg-red-500 text-white px-4 py-2 rounded hover:cursor-pointer">Cancelar</button>
                        <button type="button" onClick={handleConfirmLocation} className="bg-green-500 text-white px-4 py-2 rounded hover:cursor-pointer">Confirmar</button>
                    </div>
                </div>
            )}
            <MapContainer
                center={ubicacion || [0, 0]}
                zoom={13}
                className="w-full h-96 mt-4 z-10 relative"
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* Mueve el mapa cuando cambia la ubicación */}
                {coordenadas && <ChangeView center={coordenadas} />}
                {ubicacion && <Marker position={ubicacion} icon={icon}><Popup>Tu ubicación actual</Popup></Marker>}
                {coordenadas && <Marker position={coordenadas} icon={icon}><Popup>Dirección buscada</Popup></Marker>}
            </MapContainer>
        </div>
    );
};

export default LeafletMap;
