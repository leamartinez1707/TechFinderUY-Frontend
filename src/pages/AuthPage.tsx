import { Link, useLocation } from "react-router-dom"
import Login from "../components/auth/Login"
import Register from "../components/auth/Register"

const AuthPage = () => {

    const { pathname } = useLocation()

    const isLogin = pathname === '/login'

    return (
        <div className="bg-gray-100 flex justify-center items-center h-screen bg-[url(https://images.unsplash.com/photo-1550041473-d296a3a8a18a?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-center">

            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <div className="shadow-md p-4 rounded-md bg-white">
                    {isLogin ? <Login /> : <Register />}
                    <div className="mt-6 text-black underline">
                        <Link to={pathname === '/login' ? '/register' : '/login'}>{pathname === '/login' ? 'Registrarse' : 'Ingresar'} aquí</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage