import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useEffect, useState } from "react"
import { enqueueSnackbar } from "notistack"
import Loader from "../loader/Loader"
import ErrorMessage from "../Error/Message"
import { User2Icon, UserPlus2Icon } from "lucide-react"

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
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-center">
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
                                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
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
                                className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Usuario" />
                        </div>
                    </div>
                    <div className="flex flex-col mb-6">
                        <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Contraseña:</label>
                        <div className="relative">
                            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                <span>
                                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
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
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
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
