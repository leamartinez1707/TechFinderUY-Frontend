import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useEffect, useState } from "react"
import { enqueueSnackbar } from "notistack"
import Loader from "../loader/Loader"

const Login = () => {
    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    const navigate = useNavigate()
    const { login, isLoading, user, errors, setErrors } = useAuth()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (!form.username || !form.password) {
                setErrors(['Por favor, complete todos los campos'])
                return;
            }
            const data = await login(form)
            if (!data) {
                enqueueSnackbar('Credenciales incorrectas', { variant: 'error' })
                return;
            }
            enqueueSnackbar('Autenticado correctamente', { variant: 'success' })
            if (user?.technician) {
                navigate('/panel/tecnico')
            } else {
                navigate('/mapa')
            }
        } catch (error) {
            if (error instanceof Error) {
                enqueueSnackbar(error.message, { variant: 'error' })
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setErrors([]) // Limpiar errores al cargar el componente
        }, 3000)
    }, [])


    return (
        <form
            onSubmit={handleSubmit}
        >
            <h1 className="text-2xl font-semibold mb-4 capitalize text-center text-blue-500">Ingreso</h1>
            {errors.length > 0 && (
                <div className="bg-red-500 text-white p-1 px-2 mb-4 flex flex-col gap-y-2 rounded-md">
                    <ul className="flex flex-col gap-y-2">
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            {isLoading && <Loader />}
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-600 font-semibold">Nombre de usuario</label>
                <input
                    aria-label="Nombre de usuario"
                    autoSave="username webauthn"
                    autoFocus
                    autoComplete="username webauthn"
                    required
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    value={form.username}
                    type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="reparatodo123" />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="password" className="block text-gray-600 font-semibold">Contraseña</label>
                <input
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    value={form.password}
                    required
                    minLength={6}
                    maxLength={20}
                    aria-label="Contraseña"
                    autoSave="current-password"
                    autoComplete="current-password"
                    type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="********" />
            </div>
            <div className="mb-4 flex items-center">
                <input
                    type="checkbox" id="remember" name="remember" className="text-blue-500" />
                <label htmlFor="remember" className="text-gray-600 ml-2"
                >Recordarme</label>
            </div>
            <div className="mb-6 text-blue-500">
                <Link to="#" className="hover:underline">Olvidó su contraseña?</Link>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full capitalize hover:cursor-pointer">Confirmar</button>
        </form>
    )
}

export default Login
