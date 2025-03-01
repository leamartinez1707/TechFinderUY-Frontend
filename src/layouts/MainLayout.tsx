import { Outlet } from "react-router-dom"
import HeaderNavbar from "../components/header/HeaderNavbar"



const MainLayout = () => {
    return (
        <>

            <header className="">
                <HeaderNavbar />
            </header>

            <main className="min-h-lvh max-w-screen-2xl mx-auto bg-gray-100 mt-14">
                <Outlet />
            </main>

            <footer className="bg-gray-800 text-white">
                <h1>Footer</h1>
            </footer>

        </>
    )
}

export default MainLayout