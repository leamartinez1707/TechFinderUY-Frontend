import { Dispatch } from 'react'

type TypeUserSelectProps = {
    setSelectedRole: Dispatch<React.SetStateAction<string>>;
};
const UserTypeSelect = ({ setSelectedRole }: TypeUserSelectProps) => {
    return (
        <div className="flex gap-2 justify-between">
            <div className="mb-4 w-1/2">
                <label htmlFor="role" className="block text-gray-600 font-semibold">Tipo de usuario</label>
                <select
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full md:w-2/3 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 cursor-pointer" name="role" id="role">
                    <option value="">Seleccionar</option>
                    <option value="usuario">Usuario</option>
                    <option value="tecnico">Técnico</option>
                </select>
            </div>
        </div>
    )
}

export default UserTypeSelect;