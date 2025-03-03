import { Navigate, Outlet } from "react-router-dom"
import HeaderNavbar from "../components/header/HeaderNavbar"
import { useAuth } from "../context/AuthContext"



const MainLayout = () => {

    const { isAuthenticated } = useAuth()
    if (!isAuthenticated) return <Navigate to={'/login'} replace />

    return (
        <>

            <HeaderNavbar />

            <main className="min-h-lvh max-w-screen-xl mx-auto mt-16">
                <Outlet />
            </main>

            <footer className="bg-gray-100 border-t-2 border-gray-50 shadow-md text-white py-8 text-center">
                <h1 className="text-black">Footer</h1>
            </footer>

        </>
    )
}

export default MainLayout