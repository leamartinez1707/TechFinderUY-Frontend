import ErrorMessage from '@/components/Error/Message';
import { SignUp, SignUpUser } from '@/types';
import { professions, specialization, countryInfo } from '@/utils';
import { Dispatch } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type TechFormProps = {

    setSelectedDepartment: Dispatch<React.SetStateAction<string>>
    selectedDepartment: string;
    register: UseFormRegister<SignUp | SignUpUser>;
    selectedRole: string;
    setShowProfessions: Dispatch<React.SetStateAction<boolean>>
    showProfessions: boolean;
    services: string[];
    setServices: Dispatch<React.SetStateAction<string[]>>
    errors: FieldErrors<SignUp | SignUpUser>
}

const TechForm = ({ setSelectedDepartment, selectedDepartment, register, selectedRole, setShowProfessions, showProfessions, services, setServices, errors }: TechFormProps) => {
    return (
        <div>
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
            <div className="flex flex-col lg:flex-row justify-between gap-2 ">
                <div className="mb-4 w-full">
                    <label htmlFor="specialization" className="block text-gray-600 font-semibold">Especialización</label>
                    <select
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 cursor-pointer" id="specialization"
                        {...register("specialization")}>
                        <option value="">Seleccionar</option>
                        {specialization.map((spec) => (
                            <option key={spec.id} value={spec.nombre.toLowerCase()}>{spec.nombre}</option>
                        ))}
                    </select>
                    <ErrorMessage>
                        {selectedRole === 'tecnico' && 'specialization' in errors && errors.specialization?.message}
                    </ErrorMessage>
                </div>
            </div>
            <div className="mb-4 w-full">
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
                    <div className="border border-gray-300 rounded-md p-3 mt-2 max-h-60 overflow-y-auto w-full">
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
                    {selectedRole === 'tecnico' && 'services' in errors && errors.services?.message}
                </ErrorMessage>
            </div>
        </div>
    )
}

export default TechForm