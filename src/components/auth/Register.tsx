import { useState } from "react"
import { countryInfo, professions } from "../../utils"

const Register = () => {

    const [selectedRole, setSelectedRole] = useState<string>('')
    const [selectedDepartment, setSelectedDepartment] = useState<string>('')


    const isTechnician = selectedRole === 'tecnico'

    return (
        <form>
            <h1 className="text-2xl font-semibold mb-4 capitalize text-center text-blue-500">Registrarse</h1>

            <div className="flex gap-2 justify-between">
                <div className="mb-4 w-1/2">
                    <label htmlFor="username" className="block text-gray-600 font-semibold">Tipo de usuario</label>
                    <select
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 cursor-pointer" name="role" id="role">
                        <option value="">Seleccionar</option>
                        <option value="user">Usuario</option>
                        <option value="tecnico">Técnico</option>
                    </select>
                </div>
                {isTechnician && (
                    <div className="mb-4 w-1/2">
                        <label htmlFor="username" className="block text-gray-600 font-semibold">Profesión</label>
                        <select
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 cursor-pointer" name="role" id="role">
                            <option value="">Seleccionar</option>
                            {professions.map((prof) => (
                                <option key={prof.id} value={prof.nombre.toLowerCase()}>{prof.nombre}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>


            {isTechnician && (
                <div className="flex justify-between gap-2">
                    <div className="mb-4 w-1/2">
                        <label htmlFor="username" className="block text-gray-600 font-semibold">Departamento</label>
                        <select
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 cursor-pointer" name="role" id="role">
                            <option value="">Seleccionar</option>
                            {countryInfo.map((info) => (
                                <option key={info.id} value={info.name.toLowerCase()}>{info.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4 w-1/2">
                        <label htmlFor="username" className="block text-gray-600 font-semibold">Barrio</label>
                        <select className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 cursor-pointer" name="role" id="role">
                            <option value="">Seleccionar</option>
                            {countryInfo.find((info) => info.name.toLowerCase() === selectedDepartment)?.towns.map((neighborhood) => (
                                <option key={neighborhood.id} value={neighborhood.name.toLowerCase()}>{neighborhood.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-600 font-semibold">Nombre de usuario</label>
                <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" placeholder="usuario123" />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600 font-semibold">Correo electrónico</label>
                <input type="email" id="email" name="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" placeholder="ejemplo@gmail.com" />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-600 font-semibold">Contraseña</label>
                <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" placeholder="********" />
            </div>
            <div className="mb-4">
                <label htmlFor="confirm_password" className="block text-gray-600 font-semibold">Repetir contraseña</label>
                <input type="confirm_password" id="confirm_password" name="confirm_password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" placeholder="********" />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white font-semibold rounded-md py-2 px-4 w-full">Confirmar registro</button>
        </form >
    )
}

export default Register