import { Navigate, Outlet } from "react-router-dom"
import HeaderNavbar from "../components/header/HeaderNavbar"
import { useAuth } from "../context/AuthContext"

const AuthLayout = () => {


    const { isAuthenticated } = useAuth()

    if (isAuthenticated) return <Navigate to={'/panel'} replace />

    return (
        <div className="relative min-h-screen">
            <HeaderNavbar />
            <main className="relative flex flex-col align-middle items-center justify-center min-h-screen mx-auto p-2 md:p-24 py-28 lg:p-20">
                <Outlet />
            </main>
            {/* Fondo fijo */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[url(https://images.unsplash.com/photo-1550041473-d296a3a8a18a?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-center bg-cover bg-no-repeat" />
        </div>

    )
}

export default AuthLayout