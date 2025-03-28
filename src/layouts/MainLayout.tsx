import { Outlet } from "react-router-dom"
import HeaderNavbar from "@/components/header/HeaderNavbar"
import { useAuth } from "@/context/AuthContext"
import Loader from "@/components/loader/Loader"
import Footer from "@/components/footer/Footer"



const MainLayout = () => {

    const { isLoading } = useAuth()

    if (isLoading) return <Loader />

    return (
        <>

            <HeaderNavbar />

            <main className="min-h-lvh max-w-screen-xl mx-auto mt-16">
                <Outlet />
            </main>

            <Footer />

        </>
    )
}

export default MainLayout