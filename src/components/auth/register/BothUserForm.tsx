import ErrorMessage from '@/components/Error/Message'
import { getPasswordStrength } from '@/lib/utils';
import { SignUp, SignUpUser } from '@/types';
import { LockIcon, Mail, MapPinIcon, Phone, User2 } from 'lucide-react';
import { useState } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

type BothUserFormProps = {
    register: UseFormRegister<SignUp | SignUpUser>;
    errors: FieldErrors<SignUp | SignUpUser>;
}

const BothUserForm = ({ register, errors }: BothUserFormProps) => {
    const [passwordSelected, setPasswordSelected] = useState<string>('');
    const passwordStrength = getPasswordStrength(passwordSelected);
    return (
        <div>
            <div className="flex flex-col mb-6">
                <label htmlFor="username" className="block text-gray-600 font-semibold mb-2">Nombre de usuario:</label>
                <div className="relative">
                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <User2 className="size-6" />
                    </div>
                    <input type="text" id="username" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-gray-400" placeholder="Usuario"
                        autoComplete="off"
                        {...register("username")}
                    />
                    <ErrorMessage>
                        {errors.username && errors.username.message}
                    </ErrorMessage>
                </div>
            </div>
            <div className="flex flex-col gap-x-2 sm:flex-row w-full justify-between relative mb-4">
                <div className='flex-1'>
                    <label htmlFor="firstName" className="block text-gray-600 font-semibold">Nombre</label>
                    <input type="text" id="firstName" className="text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-gray-400" autoComplete="off" placeholder="Jose"
                        {...register("firstName")}
                    />
                    <ErrorMessage>
                        {errors.firstName && errors.firstName.message}
                    </ErrorMessage>
                </div>
                <div className='flex-1'>
                    <label htmlFor="lastName" className="block text-gray-600 font-semibold">Apellido</label>
                    <input type="text" id="lastName" className="text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-gray-400" autoComplete="off" placeholder="Perez"
                        {...register("lastName")}
                    />
                    <ErrorMessage>
                        {errors.lastName && errors.lastName.message}
                    </ErrorMessage>
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-gray-600 font-semibold">Correo electrónico</label>
                <div className="relative mb-4">
                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <Mail className="size-6" />
                    </div>
                    <input type="email" id="email" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-gray-400" autoComplete="off" placeholder="ejemplo@gmail.com"
                        {...register("email")}
                    />
                    <ErrorMessage>
                        {errors.email && errors.email.message}
                    </ErrorMessage>
                </div>
            </div>
            <div>
                <label htmlFor="phone" className="block text-gray-600 font-semibold">Número de teléfono</label>
                <div className="relative mb-4">
                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <Phone className="size-6" />
                    </div>
                    <input type="text" id="phone" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-gray-400" autoComplete="off" placeholder="095123567"
                        {...register("phone")}
                    />
                    <ErrorMessage>
                        {errors.phone && errors.phone.message}
                    </ErrorMessage>
                </div>
            </div>

            <div>
                <label htmlFor="address" className="block text-gray-600 font-semibold">Dirección</label>
                <div className="relative mb-4">
                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <MapPinIcon className="size-6" />
                    </div>
                    <input type="text" id="address" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-gray-400" autoComplete="off" placeholder="Calle principal y n° puerta"
                        {...register("address")}
                    />
                    <ErrorMessage>
                        {errors.address && errors.address.message}
                    </ErrorMessage>
                </div>
            </div>
            <div>
                <label htmlFor="password" className="block text-gray-600 font-semibold">Contraseña</label>
                <div className="relative mb-4">
                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <LockIcon className="size-6" />
                    </div>
                    <input
                        type="password"
                        id="password"
                        className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-gray-400"
                        autoComplete="off"
                        placeholder="********"
                        {...register("password")}
                        onChange={e => setPasswordSelected(e.target.value)}
                    />
                    <ErrorMessage>
                        {errors.password && errors.password.message}
                    </ErrorMessage>
                </div>
            </div>
            <div>
                <label htmlFor="confirm_password" className="block text-gray-600 font-semibold">Repetir contraseña</label>
                <div className="relative mb-4">
                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <LockIcon className="size-6" />
                    </div>
                    <input
                        type="password" id="confirm_password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-gray-400" autoComplete="off" placeholder="********"
                        {...register("confirm_password")}
                    />
                    <ErrorMessage>
                        {errors.confirm_password && errors.confirm_password.message}
                    </ErrorMessage>
                </div>
            </div>
            {passwordSelected && (
                <div className="mt-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Fortaleza de contraseña:</span>
                        <span className={`font-medium ${passwordStrength.strength >= 3 ? 'text-green-600' : passwordStrength.strength >= 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {passwordStrength.text}
                        </span>
                    </div>
                    <progress
                        className='w-full h-2 bg-gray-200 rounded-lg'
                        max={100}
                        value={((passwordStrength.strength / 4) * 100)}
                    ></progress>
                </div>
            )}
        </div >

    )
}

export default BothUserForm