import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUp, SignUpUser } from "../../types"
import ErrorMessage from "../Error/Message"
import { signUpSchema, signUpUserSchema } from "../../schemas/auth-schema"
import { useAuth } from "@/context/AuthContext"
import { enqueueSnackbar } from "notistack"
import { Link, useNavigate } from "react-router-dom"
import TechForm from "./register/TechForm"
import BothUserForm from "./register/BothUserForm"
import UserTypeSelect from "./register/UserTypeSelect"
import { LogInIcon, UserCheck } from "lucide-react"
import Loader from "../loader/Loader"

const Register = () => {

    const [selectedRole, setSelectedRole] = useState<string>('')
    const [selectedDepartment, setSelectedDepartment] = useState<string>('')
    const [services, setServices] = useState<string[]>([]);
    const [showProfessions, setShowProfessions] = useState(false);
    const [serverError, setServerError] = useState<string>('')

    const { register: signUp } = useAuth()
    const initialValues: Partial<SignUp & SignUpUser> = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        services: [''],
        username: '',
        password: '',
        confirm_password: '',
        specialization: "",
        address: ""
    }
    const selectedSchema = selectedRole === 'tecnico' ? signUpSchema : signUpUserSchema;

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SignUp | SignUpUser>({
        resolver: zodResolver(selectedSchema),
        defaultValues: initialValues
    });

    const { errors: signupErrors, isLoading } = useAuth()

    const navigate = useNavigate()

    const handleSignup = async (formData: SignUp | SignUpUser) => {
        setServerError('')
        if (!selectedRole) {
            enqueueSnackbar('Debes seleccionar un tipo de usuario', { variant: 'error' })
            return;
        }
        try {
            const data = await signUp(formData)
            if (!data) {
                enqueueSnackbar('Error al registrarse', { variant: 'error' })
                return;
            }
            if (data) {
                enqueueSnackbar('Registrado correctamente', { variant: 'success' })
                reset()
                navigate('/login')
            }
        } catch (error) {
            console.error('Error al registrarse:', error);
            if (error instanceof Error) {
                setServerError(error.message);
            } else {
                setServerError('Error desconocido');
            }
            enqueueSnackbar(error instanceof Error ? error.message : String(error), { variant: 'error' })
        }
    }
    if (isLoading) return <Loader />
    return (
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm w-full max-w-2xl my-8 min-h-screen mx-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-500 to-gray-800 from-30% px-8 py-6 text-center">
                <div className="flex items-center justify-center mb-2">
                    <UserCheck className="h-8 w-8 text-white mr-3" />
                    <h1 className="text-2xl font-bold text-white">Registrarse</h1>
                </div>
                <p className="text-white text-sm">Crea tu cuenta en buscoTécnico</p>
            </div>
            <form onSubmit={handleSubmit(handleSignup)} className="w-full p-8 space-y-6">
                {!selectedRole && <ErrorMessage>Debes seleccionar un tipo de usuario para registrarse</ErrorMessage>}
                <UserTypeSelect
                    setSelectedRole={setSelectedRole}
                />
                {selectedRole === 'tecnico' && (
                    <TechForm
                        setSelectedDepartment={setSelectedDepartment}
                        selectedDepartment={selectedDepartment}
                        register={register}
                        selectedRole={selectedRole}
                        setShowProfessions={setShowProfessions}
                        showProfessions={showProfessions}
                        services={services}
                        setServices={setServices}
                        errors={errors}
                    />
                )}
                <BothUserForm
                    register={register}
                    errors={errors}
                />
                {serverError && <p className="text-red-600 text-sm">{serverError}</p>}
                {signupErrors && signupErrors.map((error, i) => (
                    <div
                        key={i}
                        className="bg-red-500 p-1 text-white my-0.5 text-center rounded-md mx-auto">{error}
                    </div>
                )
                )}
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-gradient-to-l from-gray-500 to-gray-800 text-white font-semibold py-4 px-6 rounded-lg hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
                >
                    Confirmar registro
                </button>
            </form >
            <div className="flex mx-auto justify-center w-full mb-4 items-center text-sm text-center ">
                <LogInIcon className="size-6" />
                <span className="ml-2">¿Ya tienes una cuenta? <Link to={'/login'} className="text-blue-500 hover:text-blue-700">Ingrese aquí</Link></span>
            </div>
        </div>
    )
}

export default Register