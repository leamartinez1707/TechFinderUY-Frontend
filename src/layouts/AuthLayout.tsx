import { Navigate, Outlet, useLocation } from "react-router-dom"
import HeaderNavbar from "../components/header/HeaderNavbar"
import { useAuth } from "../context/AuthContext"
import Loader from "@/components/loader/Loader"

const AuthLayout = () => {
    const { isAuthenticated, isLoading, user } = useAuth();

    const location = useLocation();

    // Evita redirigir en rutas privadas como /panel
    const isOnPublicPage = location.pathname === '/login' || location.pathname === '/register';

    if (isLoading) return <Loader />;

    if (isAuthenticated && isOnPublicPage) {
        return user?.technician ? <Navigate to="/panel/tecnico" replace /> : <Navigate to="/mapa" replace />;
    }

    return (
        <div className="relative min-h-screen">
            <HeaderNavbar />
            <main
                className="relative flex flex-col align-middle items-center justify-center min-h-screen mx-auto p-2 md:p-24 py-28 lg:p-20">
                <Outlet />
            </main>
            <div
                className="fixed top-0 left-0 w-full h-full bg-[url(/src/assets/bgauth.webp)] -z-10 bg-center bg-cover bg-no-repeat" />

        </div>
    );
};


export default AuthLayout