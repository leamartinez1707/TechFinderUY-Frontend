import { Link } from "react-router-dom"

const Login = () => {
    return (
        <form>
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-600 font-semibold">Correo electrónico</label>
                <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-600 font-semibold">Contraseña</label>
                <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" />
            </div>
            <div className="mb-4 flex items-center">
                <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
                <label htmlFor="remember" className="text-gray-600 ml-2">Recordarme</label>
            </div>
            <div className="mb-6 text-blue-500">
                <Link to="#" className="hover:underline">Olvidó su contraseña?</Link>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full capitalize">Ingresar</button>
        </form>
    )
}

export default Login