import LeafletMap from "../../components/map/LeaFlet";
import { useAuth } from "../../context/AuthContext"

interface User {
    email?: string;
    name?: string;
}

const DashboardPage = () => {

    const { user }: { user: User | null } = useAuth()
    return (
        <div className="w-full min-h-screen">
            <div className="flex flex-col w-full my-4">
                <h1 className="text-4xl font-bold text-gray-800">Panel de {user?.name}</h1>
                <p className="text-xl text-gray-600 font-light">Bienvenido a tu panel de control. Desde aquí podras controlar los datos de tu empresa.</p>
                <p className="text-xl text-gray-600 font-light">Recordamos que es fundamental que los datos sean correctos, para que todos los usuarios puedan encontrarte facilmente.</p>
            </div>

            <section className="grid md:grid-cols-2 gap-4 shadow p-4">
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-medium my-2">Confirmar ubicación en el mapa</h2>
                    <LeafletMap />
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-medium my-2">Verificar datos</h2>
                </div>
            </section>

        </div>
    )
}

export default DashboardPage