import { useState } from "react"
import { MapPin, Briefcase, Phone, Mail, Home, Edit, Save, X, ClipboardCheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/AuthContext" // Importar el contexto de autenticación
import { useUsers } from "@/context/UsersContext"
import type { EditProfileData, UserTechnician } from "@/types" // Importar los types definidos
import { capitalizeFirstLetter, professions } from "@/utils"
import LeafletMap from "../map/LeaFlet"
import { Rating } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { averageRating } from "@/lib/utils"

const DashboardUi = () => {
    // Obtener los datos del técnico desde el contexto de autenticación
    const { user } = useAuth()
    const { updateProfileData, updateTechnicalData, reviews } = useUsers()
    const technician: UserTechnician = user as UserTechnician
    const navigate = useNavigate()

    // Estados para controlar la edición
    const [editingPersonal, setEditingPersonal] = useState(false)
    const [editingTechnical, setEditingTechnical] = useState(false)
    // Estados para almacenar los datos editados (inicializados con valores por defecto en caso de que technician sea null)
    const [editedUser, setEditedUser] = useState<EditProfileData>({
        firstName: technician?.firstName || "",
        lastName: technician?.lastName || "",
        email: technician?.email || "",
        phone: technician?.phone || "",
        address: technician?.address || "",
    })

    const [editedTechnical, setEditedTechnical] = useState({
        specialization: technician.technician.specialization || "",
        services: technician.technician.services || [],
    })

    // Estado para el nuevo servicio
    const [newService, setNewService] = useState("")

    // Manejadores para guardar cambios
    const handleSavePersonal = () => {
        // Aquí normalmente enviarías los datos al backend
        // Por ahora solo actualizamos el estado local
        updateProfileData(technician.id, editedUser)
        console.log("Datos personales actualizados:", editedUser)
        setEditingPersonal(false)
    }

    const handleSaveTechnical = () => {
        // Aquí normalmente enviarías los datos al backend
        updateTechnicalData(technician.id, editedTechnical)
        console.log("Datos técnicos actualizados:", editedTechnical)
        setEditingTechnical(false)
    }
    // Manejador para añadir un nuevo servicio
    const handleAddService = () => {
        if (newService.trim()) {
            setEditedTechnical({
                ...editedTechnical,
                services: [...editedTechnical.services, newService.trim()],
            })
            setNewService("")
        }
    }

    // Manejador para eliminar un servicio
    const handleRemoveService = (index: number) => {
        const updatedServices = [...editedTechnical.services]
        updatedServices.splice(index, 1)
        setEditedTechnical({
            ...editedTechnical,
            services: updatedServices,
        })
    }

    // Si no hay datos de técnico, mostrar un mensaje
    if (!technician) {
        return (
            <div className="container mx-auto py-8 px-4 text-center">
                <h1 className="text-3xl font-bold mb-4">Panel de Técnico</h1>
                <Card>
                    <CardContent className="py-10">
                        <p>No se encontraron datos de técnico. Por favor, contacta al administrador.</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Panel de Técnico</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Información Personal */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Información Personal</CardTitle>
                            <CardDescription>Tus datos personales</CardDescription>
                        </div>
                        {!editingPersonal ? (
                            <Button className="hover:cursor-pointer" variant="ghost" size="icon" onClick={() => setEditingPersonal(true)}>
                                <Edit className="h-4 w-4" />
                            </Button>
                        ) : null}
                    </CardHeader>
                    <CardContent>
                        {!editingPersonal ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <ClipboardCheckIcon className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium capitalize">
                                        {technician.firstName} {technician.lastName}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{technician.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{technician.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Home className="h-4 w-4 text-muted-foreground capitalize" />
                                    <span className="capitalize">{technician.address}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="text-sm font-medium">
                                            Nombre
                                        </label>
                                        <Input
                                            id="firstName"
                                            className="capitalize"
                                            value={editedUser.firstName}
                                            onChange={(e: { target: { value: string } }) => setEditedUser({ ...editedUser, firstName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="text-sm font-medium">
                                            Apellido
                                        </label>
                                        <Input
                                            id="lastName"
                                            className="capitalize"
                                            value={editedUser.lastName}
                                            onChange={(e: { target: { value: string } }) => setEditedUser({ ...editedUser, lastName: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={editedUser.email}
                                        onChange={(e: { target: { value: string } }) => setEditedUser({ ...editedUser, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium">
                                        Teléfono
                                    </label>
                                    <Input
                                        id="phone"
                                        value={editedUser.phone}
                                        onChange={(e: { target: { value: string } }) => setEditedUser({ ...editedUser, phone: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="address" className="text-sm font-medium">
                                        Dirección
                                    </label>
                                    <Input
                                        id="address"
                                        className="capitalize"
                                        value={editedUser.address}
                                        onChange={(e: { target: { value: string } }) => setEditedUser({ ...editedUser, address: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}
                    </CardContent>
                    {editingPersonal && (
                        <CardFooter className="flex justify-between">
                            <Button
                                className="hover:cursor-pointer"
                                variant="outline"
                                onClick={() => {
                                    setEditedUser({ ...technician })
                                    setEditingPersonal(false)
                                }}
                            >
                                <X className="h-4 w-4 mr-2" />
                                Cancelar
                            </Button>
                            <Button
                                className="hover:cursor-pointer"
                                onClick={handleSavePersonal}>
                                <Save className="h-4 w-4 mr-2" />
                                Guardar
                            </Button>
                        </CardFooter>
                    )}
                </Card>

                {/* Información Técnica */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Información Técnica</CardTitle>
                            <CardDescription>Tu especialización y servicios</CardDescription>
                        </div>
                        {!editingTechnical ? (
                            <Button
                                className="hover:cursor-pointer"
                                variant="ghost" size="icon" onClick={() => setEditingTechnical(true)}>
                                <Edit className="h-4 w-4" />
                            </Button>
                        ) : null}
                    </CardHeader>
                    <CardContent>
                        {!editingTechnical ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Especialización: {technician.technician.specialization}</span>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="text-sm font-medium mb-2">Servicios:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {editedTechnical.services.map(service => (
                                            <Badge key={service} variant="secondary">
                                                {capitalizeFirstLetter(service)}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        onClick={() => navigate("/panel/tecnico/agenda")}
                                        className="w-full hover:cursor-pointer bg-cyan-700 hover:bg-cyan-800">Definir disponibilidad</Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="specialization" className="text-sm font-medium">
                                        Especialización
                                    </label>
                                    <Input
                                        id="specialization"
                                        value={editedTechnical.specialization}
                                        onChange={(e: { target: { value: string } }) => setEditedTechnical({ ...editedTechnical, specialization: e.target.value })}
                                    />
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Servicios</label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {editedTechnical.services.map((service: string, index: number) => (
                                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                                {capitalizeFirstLetter(service)}
                                                <button
                                                    onClick={() => handleRemoveService(index)}
                                                    className="ml-1 rounded-full hover:bg-muted p-0.5 hover:cursor-pointer"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <select
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={newService}
                                            onChange={(e) => setNewService(e.target.value)}
                                        >
                                            <option value="" disabled>
                                                Seleccionar servicio
                                            </option>
                                            {professions
                                                .filter((service) => !editedTechnical.services.includes(service.nombre.toLowerCase()))
                                                .map((service) => (
                                                    <option key={service.id} value={service.nombre.toLowerCase()}>
                                                        {service.nombre}
                                                    </option>
                                                ))}
                                        </select>
                                        <Button
                                            className="hover:cursor-pointer"
                                            variant="outline" onClick={handleAddService}>
                                            Añadir
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                    {editingTechnical && (
                        <CardFooter className="flex justify-between">
                            <Button
                                className="hover:cursor-pointer"
                                variant="outline"
                                onClick={() => {
                                    setEditedTechnical({
                                        specialization: technician.technician.specialization,
                                        services: [...technician.technician.services],
                                    })
                                    setEditingTechnical(false)
                                }}
                            >
                                <X className="h-4 w-4 mr-2" />
                                Cancelar
                            </Button>
                            <Button
                                className="hover:cursor-pointer"
                                onClick={handleSaveTechnical}>
                                <Save className="h-4 w-4 mr-2" />
                                Guardar
                            </Button>
                        </CardFooter>
                    )}
                </Card>

                {/* Ubicación */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Ubicación</CardTitle>
                            <CardDescription>Tus coordenadas geográficas</CardDescription>
                            <CardDescription>Busqué su nueva dirección y guarde los cambios para cambiar sus datos.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>Latitud: {technician.technician.latitude}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>Longitud: {technician.technician.longitude}</span>
                            </div>
                            <div className="mt-4 aspect-video bg-muted rounded-md flex items-center justify-center">
                                <LeafletMap userDirection={editedUser.address} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Estado de la cuenta */}
                <Card>
                    <CardHeader>
                        <CardTitle>Estado de la cuenta</CardTitle>
                        <CardDescription>Información sobre tu cuenta</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Estado:</span>
                                <Badge
                                    className={technician.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"}
                                >
                                    {technician.isActive ? "Activo" : "Inactivo"}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Nombre de usuario:</span>
                                <span>{technician.username}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-medium">ID de técnico:</span>
                                <span>{technician.id}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Calificación:</span>
                                {/* Identificar el rating del tecnico segun las calificaciones otorgadas por el usuario */}
                                <Rating name="size-medium" readOnly value={averageRating(reviews)} />
                            </div>
                            <div>
                                <Button
                                    onClick={() => navigate("/panel/tecnico/calificacion")}
                                    className="w-full hover:cursor-pointer bg-black">Ver reseñas de clientes</Button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            variant="outline" className="w-full hover:cursor-pointer">
                            Cambiar contraseña
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div >
    )
}

export default DashboardUi;