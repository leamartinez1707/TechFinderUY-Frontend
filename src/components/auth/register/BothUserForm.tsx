import ErrorMessage from '@/components/Error/Message'
import { SignUp, SignUpUser } from '@/types';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

type BothUserFormProps = {
    register: UseFormRegister<SignUp | SignUpUser>;
    errors: FieldErrors<SignUp | SignUpUser>;
}

const BothUserForm = ({ register, errors }: BothUserFormProps) => {
    return (
        <div>
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-600 font-semibold">Nombre de usuario</label>
                <input type="text" id="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" placeholder="usuario123"
                    {...register("username")}
                />
                <ErrorMessage>
                    {errors.username && errors.username.message}
                </ErrorMessage>
            </div>
            <div className="flex flex-col gap-x-2 sm:flex-row w-full justify-between mb-4">
                <div className='flex-1'>
                    <label htmlFor="firstName" className="block text-gray-600 font-semibold">Nombre</label>
                    <input type="text" id="firstName" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" placeholder="Jose"
                        {...register("firstName")}
                    />
                    <ErrorMessage>
                        {errors.firstName && errors.firstName.message}
                    </ErrorMessage>
                </div>
                <div className='flex-1'>
                    <label htmlFor="lastName" className="block text-gray-600 font-semibold">Apellido</label>
                    <input type="text" id="lastName" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" placeholder="Perez"
                        {...register("lastName")}
                    />
                    <ErrorMessage>
                        {errors.lastName && errors.lastName.message}
                    </ErrorMessage>
                </div>
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
                <input type="text" id="address" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" placeholder="Calle principal y n° puerta"
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
        </div>
    )
}

export default BothUserForm