import { Outlet } from "react-router-dom"
import HeaderNavbar from "../components/header/HeaderNavbar"



const MainLayout = () => {
    return (
        <>

            <HeaderNavbar />

            <main className="min-h-lvh max-w-screen-xl mx-auto mt-16">
                <Outlet />
            </main>

            <footer className="bg-gray-800 text-white">
                <h1>Footer</h1>
            </footer>

        </>
    )
}

export default MainLayout