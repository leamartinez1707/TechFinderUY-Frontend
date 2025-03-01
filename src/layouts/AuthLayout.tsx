import { Outlet } from "react-router-dom"
import HeaderNavbar from "../components/header/HeaderNavbar"

const AuthLayout = () => {
    return (
        <div className="">
            <HeaderNavbar />
            <main className="min-h-lvh max-w-screen-xl mx-auto ">
                <Outlet />
            </main>
        </div>
    )
}

export default AuthLayout