import { useState } from "react";

const SearchDirection = () => {
    const [direccion, setDireccion] = useState<string>("");
    const [coordenadas, setCoordenadas] = useState<[number, number] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const buscarDireccion = async () => {
        if (!direccion) return;

        setLoading(true);
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
        } catch (err) {
            console.error(err);
            setError("Error al buscar la dirección");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-2 p-4 border border-gray-300 rounded-md">
            <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Ingresa tu dirección"
                className="border p-2 w-full rounded-md"
            />
            <button
                onClick={buscarDireccion}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                disabled={loading}
            >
                {loading ? "Buscando..." : "Buscar"}
            </button>
            {coordenadas && <p>📍 Coordenadas: {coordenadas[0]}, {coordenadas[1]}</p>}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default SearchDirection;
