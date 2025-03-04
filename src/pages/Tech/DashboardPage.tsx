import DashboardUi from "@/components/technician/DashboardUI";

const DashboardPage = () => {

    // const { user } = useAuth()
    // const userCoordinates: [number, number] = [parseFloat(user?.latitude || '0'), parseFloat(user?.longitude || '0')]
    // console.log(userCoordinates)
    return (
        // <div className="w-full min-h-screen p-4 md:p-8">
        //     <div className="flex flex-col w-full my-4">
        //         <h1 className="text-4xl font-bold text-gray-800">Panel de {user?.user?.firstName + ' ' + user?.user?.lastName || 'usuario'}</h1>
        //         <p className="text-xl text-gray-600 font-light">Bienvenido a tu panel de control. Desde aquí podras controlar los datos de tu empresa.</p>
        //         <p className="text-xl text-gray-600 font-light">Recordamos que es fundamental que los datos sean correctos, para que todos los usuarios puedan encontrarte facilmente.</p>
        //     </div>

        //     <section className="grid md:grid-cols-2 gap-4 shadow border-gray-200 border p-4 min-h-svh">
        //         <div className="flex flex-col items-center">
        //             <h2 className="text-xl font-medium my-2">Confirmar ubicación en el mapa</h2>
        //             <LeafletMap coordinates={userCoordinates} />
        //         </div>

        //         <div className="flex flex-col items-center">
        //             <h2 className="text-xl font-medium my-2">Verificar datos</h2>
        //             <div className="flex flex-col w-full p-4 bg-gray-100 rounded-md">
        //                 <p className="text-gray-600">Nombre: {user?.user?.firstName + ' ' + user?.user?.lastName}</p>
        //                 <p className="text-gray-600">Email: {user?.user?.email}</p>
        //                 <p className="text-gray-600">Teléfono: {user?.user.phone}</p>
        //                 <p className="text-gray-600">Dirección: {user?.user.address}</p>
        //                 <p className="text-gray-600">Especialización: {user?.specialization}</p>
        //                 <p className="text-gray-600">Servicios: {user?.services.map(serv => (
        //                     <span key={serv} className="bg-gray-50 p-1 m-1 rounded-md capitalize">{serv}</span>
        //                 )
        //                 )}</p>

        //             </div>

        //         </div>
        //     </section>

        // </div>
        <DashboardUi />
    )
}

export default DashboardPage