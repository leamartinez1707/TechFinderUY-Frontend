import { Outlet } from "react-router-dom"
import HeaderNavbar from "../components/header/HeaderNavbar"

const AuthLayout = () => {


    // const isAuth = false

    // if (isAuth) return <Navigate to={'/'} replace />
    
    return (
        <div className="">
            <HeaderNavbar />
            <main className="flex flex-col align-middle items-center justify-center min-h-screen mx-auto bg-[url(https://images.unsplash.com/photo-1550041473-d296a3a8a18a?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-center bg-cover bg-no-repeat p-10 py-28 lg:p-28">
                <Outlet />
            </main>
        </div>
    )
}

export default AuthLayout