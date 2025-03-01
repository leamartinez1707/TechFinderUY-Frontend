
const Register = () => {
    return (
        <form>
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
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white font-semibold rounded-md py-2 px-4 w-full capitalize">Confirmar registro</button>
        </form >
    )
}

export default Register