import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useEffect, useState } from "react"
import { enqueueSnackbar } from "notistack"
import ErrorMessage from "../Error/Message"
import { LockIcon, User2, User2Icon, UserPlus2Icon } from "lucide-react"
import Loader from "../loader/Loader"

const Login = () => {
    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    const navigate = useNavigate()
    const { login, isLoading, user, errors, setErrors, isAuthenticated } = useAuth()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (!form.username || !form.password) {
                setErrors(['Por favor, complete todos los campos'])
                return;
            }
            const data = await login(form)
            console.log('hizo login', data)
            if (!data) {
                enqueueSnackbar('Credenciales incorrectas', { variant: 'error' })
                return;
            }
            enqueueSnackbar('Autenticado correctamente', { variant: 'success' })
        } catch (error) {
            console.error('Error al iniciar sesión:', error)
            if (error instanceof Error) {
                enqueueSnackbar(error.message, { variant: 'error' })
            }
        }
    }

    useEffect(() => {
        // Navegar solo cuando el usuario esté autenticado
        if (user && isAuthenticated) {
            if (user.technician) {
                navigate('/panel/tecnico')
            } else {
                navigate('/mapa')
            }
        }
    }, [user, isAuthenticated, navigate])

    useEffect(() => {
        setTimeout(() => {
            setErrors([]) // Limpiar errores al cargar el componente
        }, 8000)
    }, [])

    if (isLoading) return <Loader />

    return (

        <div className="flex flex-col w-full justify-center min-h-screen">
            <div className="rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm w-full max-w-2xl my-8 mx-auto flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-500 to-gray-800 from-30% px-8 py-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                        <User2Icon className="h-8 w-8 text-white mr-3" />
                        <h1 className="text-2xl font-bold text-white">Ingrese a su cuenta</h1>
                    </div>
                    <p className="text-blue-100 text-sm">Inicia sesión en tu cuenta de buscoTécnico</p>
                </div>
                <form onSubmit={handleSubmit} className="w-full p-8 space-y-6">
                    <ul className="flex flex-col gap-y-2">
                        {errors.map((error, index) => (
                            <ErrorMessage key={index}>{error}</ErrorMessage>
                        ))}
                    </ul>
                    <div className="flex flex-col mb-6">
                        <label htmlFor="username" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Nombre de usuario:</label>
                        <div className="relative">
                            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                <User2 className="size-6" />
                            </div>

                            <input
                                aria-label="Nombre de usuario"
                                autoSave="username webauthn"
                                autoFocus
                                autoComplete="username webauthn"
                                required
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                value={form.username}
                                type="text" id="username" name="username"
                                className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-gray-400" placeholder="Usuario" />
                        </div>
                    </div>
                    <div className="flex flex-col mb-6">
                        <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Contraseña:</label>
                        <div className="relative">
                            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                <LockIcon className="size-6" />
                            </div>

                            <input
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                value={form.password}
                                required
                                minLength={6}
                                maxLength={20}
                                aria-label="Contraseña"
                                autoSave="current-password"
                                autoComplete="current-password"
                                type="password" id="password" name="password"
                                className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Contraseña" />
                        </div>
                    </div>

                    <div className="flex items-center mb-6 -mt-4">
                        <div className="flex ml-auto">
                            <a href="#" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">Olvidó su contraseña?</a>
                        </div>
                    </div>

                    <div className="flex w-full">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-full bg-gradient-to-l from-gray-500 to-gray-800 text-white font-semibold py-4 px-6 rounded-lg hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
                        >
                            Ingresar
                        </button>
                    </div>
                </form>
                <div className="flex mx-auto justify-center w-full mb-4 items-center text-sm text-center ">
                    <UserPlus2Icon className="size-6" />
                    <div className="ml-2">¿No tienes una cuenta? <Link to={'/register'} className="text-blue-500 hover:text-blue-700">Registrarse aquí</Link></div>
                </div>
            </div>
        </div>

    )
}

export default Login
