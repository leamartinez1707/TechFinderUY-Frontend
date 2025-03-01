import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <>
            <main className="min-h-lvh max-w-screen-2xl mx-auto bg-gray-100">
                <Outlet />
            </main>

            <footer className="bg-gray-800 text-white">
                <h1>Footer</h1>
            </footer>

        </>
    )
}

export default AuthLayout