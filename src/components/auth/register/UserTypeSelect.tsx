import { UserCheck2 } from 'lucide-react';
import { Dispatch } from 'react'

type TypeUserSelectProps = {
    setSelectedRole: Dispatch<React.SetStateAction<string>>;
};
const UserTypeSelect = ({ setSelectedRole }: TypeUserSelectProps) => {
    return (
        <div className="flex flex-col gap-2 justify-between">
            <label htmlFor="role" className="block text-gray-600 font-semibold">Tipo de usuario</label>
            <div className="relative mb-4 w-1/2">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <UserCheck2 className="size-6" />
                </div>
                <select
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-gray-400" name="role" id="role">
                    <option value="">Seleccionar</option>
                    <option value="usuario">Usuario</option>
                    <option value="tecnico">Técnico</option>
                </select>
            </div>
        </div>
    )
}

export default UserTypeSelect;