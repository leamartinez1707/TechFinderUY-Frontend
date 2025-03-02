import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { countryInfo, professions } from "../../utils"
import { SignUp } from "../../types"
import { signUpRequest } from "../../api/authApi"
import ErrorMessage from "../Error/Message"
import { signUpSchema } from "../../schemas/auth-schema"

const Register = () => {

    const initialValues: SignUp = {
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

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SignUp>({
        resolver: zodResolver(signUpSchema),
        defaultValues: initialValues
    });

    const [selectedRole, setSelectedRole] = useState<string>('')
    const [selectedDepartment, setSelectedDepartment] = useState<string>('')
    const [services, setServices] = useState<string[]>([]);
    const [showProfessions, setShowProfessions] = useState(false);



    const isTechnician = selectedRole === 'tecnico'

    // Función para reiniciar los errores después de 5 segundos
    // const resetErrors = () => {
    //     setTimeout(() => {
    //         clearErrors(); // Limpia los errores
    //     }, 5000); // 5000ms = 5 segundos
    // };

    const handleSignup = async (formData: SignUp) => {
        console.log('registrando..')
        await signUpRequest(formData)
        reset()
    }




    return (
        <form onSubmit={handleSubmit(handleSignup)}>
            <h1 className="text-2xl font-semibold mb-4 capitalize text-center text-blue-500">Registrarse</h1>

            <div className="flex gap-2 justify-between">
                <div className="mb-4 w-1/2">
                    <label htmlFor="role" className="block text-gray-600 font-semibold">Tipo de usuario</label>
                    <select
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 cursor-pointer" name="role" id="role">
                        <option value="">Seleccionar</option>
                        <option value="usuario">Usuario</option>
                        <option value="tecnico">Técnico</option>
                    </select>
                </div>
            </div>

            {isTechnician && (
                <div className="flex justify-between gap-2">
                    <div className="mb-4 w-1/2">
                        <label htmlFor="department" className="block text-gray-600 font-semibold">Departamento</label>
                        <select
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 cursor-pointer" name="department" id="department">
                            <option value="">Seleccionar</option>
                            {countryInfo.map((info) => (
                                <option key={info.id} value={info.name.toLowerCase()}>{info.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4 w-1/2">
                        <label htmlFor="neighborhood" className="block text-gray-600 font-semibold">Barrio</label>
                        <select className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 cursor-pointer" name="neighborhood" id="neighborhood">
                            <option value="">Seleccionar</option>
                            {countryInfo.find((info) => info.name.toLowerCase() === selectedDepartment)?.towns.map((neighborhood) => (
                                <option key={neighborhood.id} value={neighborhood.name.toLowerCase()}>{neighborhood.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
            {isTechnician && (
                <div className="flex flex-col lg:flex-row justify-between gap-2">
                    <div className="mb-4">
                        <label htmlFor="specialization" className="block text-gray-600 font-semibold">Especialización</label>
                        <input type="text" id="specialization" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" placeholder="Electricidad"
                            {...register("specialization")}
                        />
                        <ErrorMessage>
                            {errors.specialization && errors.specialization.message}
                        </ErrorMessage>
                    </div>

                    <div className="mb-4 w-full lg:w-1/2">
                        <label className="block text-gray-600 font-semibold mb-2">Profesión</label>

                        {/* Botón para desplegar/contraer */}
                        <button
                            type="button"
                            onClick={() => setShowProfessions(!showProfessions)}
                            className="w-full bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-md text-left flex justify-between items-center hover:cursor-pointer"
                        >
                            {showProfessions ? "Ocultar profesiones" : "Seleccionar profesión"}
                            <span>{showProfessions ? "▲" : "▼"}</span>
                        </button>

                        {/* Lista desplegable de checkboxes */}
                        {showProfessions && (
                            <div className="border border-gray-300 rounded-md p-3 mt-2 max-h-60 overflow-y-auto">
                                {professions.map((prof) => (
                                    <div key={prof.id} className="flex items-center mb-2">
                                        <input
                                            type="checkbox"
                                            id={`service-${prof.id}`}
                                            value={prof.nombre.toLowerCase()}
                                            checked={services.includes(prof.nombre.toLowerCase())}
                                            {...register("services", { required: "Debes seleccionar al menos un servicio" })}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setServices([...services, e.target.value]); // Agregar si se selecciona
                                                } else {
                                                    setServices(services.filter(service => service !== e.target.value)); // Quitar si se deselecciona
                                                }
                                            }}
                                            className="mr-2 hover:cursor-pointer"
                                        />
                                        <label htmlFor={`service-${prof.id}`} className="text-gray-700 hover:cursor-pointer">{prof.nombre}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                        <ErrorMessage>
                            {errors.services && errors.services.message}
                        </ErrorMessage>
                    </div>
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-600 font-semibold">Nombre de usuario</label>
                <input type="text" id="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" placeholder="usuario123"
                    {...register("username")}
                />
                <ErrorMessage>
                    {errors.username && errors.username.message}
                </ErrorMessage>
            </div>
            <div className="mb-4">
                <label htmlFor="firstName" className="block text-gray-600 font-semibold">Nombre</label>
                <input type="text" id="firstName" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" placeholder="Jose"
                    {...register("firstName")}
                />
                <ErrorMessage>
                    {errors.firstName && errors.firstName.message}
                </ErrorMessage>
            </div>
            <div className="mb-4">
                <label htmlFor="lastName" className="block text-gray-600 font-semibold">Apellido</label>
                <input type="text" id="lastName" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" placeholder="Perez"
                    {...register("lastName")}
                />
                <ErrorMessage>
                    {errors.lastName && errors.lastName.message}
                </ErrorMessage>
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600 font-semibold">Correo electrónico</label>
                <input type="email" id="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" placeholder="ejemplo@gmail.com"
                    {...register("email")}
                />
                <ErrorMessage>
                    {errors.email && errors.email.message}
                </ErrorMessage>
            </div>
            <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-600 font-semibold">Número de teléfono</label>
                <input type="text" id="phone" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" placeholder="095123567"
                    {...register("phone")}
                />
                <ErrorMessage>
                    {errors.phone && errors.phone.message}
                </ErrorMessage>
            </div>
            <div className="mb-4">
                <label htmlFor="address" className="block text-gray-600 font-semibold">Dirección</label>
                <input type="text" id="address" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" placeholder="Calle 123"
                    {...register("address")}
                />
                <ErrorMessage>
                    {errors.address && errors.address.message}
                </ErrorMessage>
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-600 font-semibold">Contraseña</label>
                <input type="password" id="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" placeholder="********"
                    {...register("password")}
                />
                <ErrorMessage>
                    {errors.password && errors.password.message}
                </ErrorMessage>
            </div>
            <div className="mb-4">
                <label htmlFor="confirm_password" className="block text-gray-600 font-semibold">Repetir contraseña</label>
                <input type="password" id="confirm_password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" placeholder="********"
                    {...register("confirm_password")}
                />
                <ErrorMessage>
                    {errors.confirm_password && errors.confirm_password.message}
                </ErrorMessage>
            </div>
            <button
                disabled={isSubmitting}
                type="submit" className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white font-semibold rounded-md py-2 px-4 w-full">Confirmar registro</button>
        </form >
    )
}

export default Register