import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useState } from "react"
import { enqueueSnackbar } from "notistack"

const Login = () => {
    // Utilizar react hook para manejar el estado del formulario
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const { login } = useAuth()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { email } = form
        const response = await login({ email, name: 'Leandro' }, 'token123')

        if (!response) return enqueueSnackbar('Credenciales incorrectas', { variant: 'error' })
        enqueueSnackbar(response, { variant: 'success' })

        // Limpiar el formulario
        setForm({ email: '', password: '' })

        navigate('/panel')
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            <h1 className="text-2xl font-semibold mb-4 capitalize text-center text-blue-500">Ingreso</h1>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600 font-semibold">Correo electrónico</label>
                <input
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    value={form.email}
                    type="text" id="email" name="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="email" placeholder="ejemplo@gmail.com" />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-600 font-semibold">Contraseña</label>
                <input
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    value={form.password}
                    type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" placeholder="********" />
            </div>
            <div className="mb-4 flex items-center">
                <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
                <label htmlFor="remember" className="text-gray-600 ml-2">Recordarme</label>
            </div>
            <div className="mb-6 text-blue-500">
                <Link to="#" className="hover:underline">Olvidó su contraseña?</Link>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full capitalize hover:cursor-pointer">Confirmar</button>
        </form>
    )
}

export default Login