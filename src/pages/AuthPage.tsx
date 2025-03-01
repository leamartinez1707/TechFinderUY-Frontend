import { Link, useLocation } from "react-router-dom"
import Login from "../components/auth/Login"
import Register from "../components/auth/Register"

const AuthPage = () => {

    const { pathname } = useLocation()

    const isLogin = pathname === '/login'

    return (
        <div className="shadow-md rounded-md bg-white w-full lg:w-3/4 xl:w-1/2 mx-auto p-8">
            {isLogin ? <Login /> : <Register />}
            <div className="mt-6 text-black underline">
                <Link to={pathname === '/login' ? '/register' : '/login'}>{pathname === '/login' ? 'Registrarse' : 'Ingresar'} aquí</Link>
            </div>
        </div>
    )
}

export default AuthPage