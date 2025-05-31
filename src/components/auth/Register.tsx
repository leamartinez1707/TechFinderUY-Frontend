import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUp, SignUpUser } from "../../types"
import ErrorMessage from "../Error/Message"
import { signUpSchema, signUpUserSchema } from "../../schemas/auth-schema"
import { useAuth } from "@/context/AuthContext"
import Loader from "../loader/Loader"
import { enqueueSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"
import TechForm from "./register/TechForm"
import BothUserForm from "./register/BothUserForm"
import { Button } from "../ui/button"
import UserTypeSelect from "./register/UserTypeSelect"

const Register = () => {

    const [selectedRole, setSelectedRole] = useState<string>('')
    const [selectedDepartment, setSelectedDepartment] = useState<string>('')
    const [services, setServices] = useState<string[]>([]);
    const [showProfessions, setShowProfessions] = useState(false);
    const [serverError, setServerError] = useState<string>('')

    const { isLoading, register: signUp } = useAuth()
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

    const { errors: signupErrors } = useAuth()

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
    return (
        <form onSubmit={handleSubmit(handleSignup)}>
            <h1 className="text-2xl font-semibold mb-4 capitalize text-center text-blue-500">Registrarse</h1>
            {isLoading && <Loader />}
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
            <Button
                disabled={isSubmitting}
                type="submit" className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white font-semibold rounded-md py-2 mt-4 px-4 w-full">
                Confirmar registro
            </Button>
        </form >
    )
}

export default Register