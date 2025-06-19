import { Outlet } from "react-router-dom"
import HeaderNavbar from "@/components/header/HeaderNavbar"
import Footer from "@/components/footer/Footer"



const MainLayout = () => {

    return (
        <>
            <HeaderNavbar />
            <main className="min-h-lvh max-w-screen-2xl mx-auto mt-16">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default MainLayout