import { useState } from "react"
import { Clock, Plus, Trash2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { enqueueSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"

// Tipos
interface TimeSlot {
    id: string
    start: string
    end: string
}

interface DaySchedule {
    enabled: boolean
    timeSlots: TimeSlot[]
}

interface WeeklySchedule {
    [key: string]: DaySchedule
}

// Constantes
const DAYS_OF_WEEK = [
    { id: "monday", label: "Lunes" },
    { id: "tuesday", label: "Martes" },
    { id: "wednesday", label: "Miércoles" },
    { id: "thursday", label: "Jueves" },
    { id: "friday", label: "Viernes" },
    { id: "saturday", label: "Sábado" },
    { id: "sunday", label: "Domingo" },
]

// Horas disponibles (formato 24h)
const HOURS = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0")
    return { value: `${hour}:00`, label: `${hour}:00` }
})

const Schedule = () => {
    const toast = enqueueSnackbar

    // Estado inicial: de lunes a viernes, 9:00 a 17:00
    const [schedule, setSchedule] = useState<WeeklySchedule>(() => {
        const initialSchedule: WeeklySchedule = {}

        DAYS_OF_WEEK.forEach((day) => {
            initialSchedule[day.id] = {
                enabled: ["monday", "tuesday", "wednesday", "thursday", "friday"].includes(day.id),
                timeSlots: [
                    {
                        id: crypto.randomUUID(),
                        start: "09:00",
                        end: "17:00",
                    },
                ],
            }
        })

        return initialSchedule
    })

    // Función para generar un ID único
    const generateId = () => crypto.randomUUID()

    // Manejar cambio en el checkbox de día
    const handleDayToggle = (dayId: string) => {
        setSchedule((prev) => ({
            ...prev,
            [dayId]: {
                ...prev[dayId],
                enabled: !prev[dayId].enabled,
            },
        }))
    }

    // Añadir un nuevo horario a un día
    const addTimeSlot = (dayId: string) => {
        setSchedule((prev) => ({
            ...prev,
            [dayId]: {
                ...prev[dayId],
                timeSlots: [
                    ...prev[dayId].timeSlots,
                    {
                        id: generateId(),
                        start: "09:00",
                        end: "17:00",
                    },
                ],
            },
        }))
    }

    // Eliminar un horario
    const removeTimeSlot = (dayId: string, slotId: string) => {
        setSchedule((prev) => ({
            ...prev,
            [dayId]: {
                ...prev[dayId],
                timeSlots: prev[dayId].timeSlots.filter((slot) => slot.id !== slotId),
            },
        }))
    }

    // Actualizar un horario
    const updateTimeSlot = (dayId: string, slotId: string, field: "start" | "end", value: string) => {
        setSchedule((prev) => ({
            ...prev,
            [dayId]: {
                ...prev[dayId],
                timeSlots: prev[dayId].timeSlots.map((slot) => (slot.id === slotId ? { ...slot, [field]: value } : slot)),
            },
        }))
    }

    // Guardar la disponibilidad
    const saveAvailability = () => {
        // Aquí normalmente enviarías los datos al backend
        console.log("Guardando disponibilidad:", schedule)

        toast("Tu horario ha sido actualizado correctamente.")
    }

    const navigate = useNavigate()
    return (
        <Card className="container mx-auto w-full mt-30 mb-10">
            <Button className="flex justify-center bg-black ml-6 rounded-none text-white w-1/2 md:w-1/6" onClick={() => navigate("/panel")}>
                Volver al panel
            </Button>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Disponibilidad Semanal
                </CardTitle>
                <CardDescription>
                    Define los días y horarios en los que estás disponible para prestar servicios.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {DAYS_OF_WEEK.map((day) => (
                        <div key={day.id} className="border-b pb-4 last:border-b-0">
                            <div className="flex items-center space-x-2 mb-4">
                                <Checkbox
                                    id={`day-${day.id}`}
                                    checked={schedule[day.id].enabled}
                                    onCheckedChange={() => handleDayToggle(day.id)}
                                />
                                <Label
                                    htmlFor={`day-${day.id}`}
                                    className={`font-medium ${!schedule[day.id].enabled ? "text-muted-foreground" : ""}`}
                                >
                                    {day.label}
                                </Label>
                            </div>

                            {schedule[day.id].enabled && (
                                <div className="pl-6 space-y-3">
                                    {schedule[day.id].timeSlots.map((slot, ) => (
                                        <div key={slot.id} className="flex items-center gap-2">
                                            <Select
                                                value={slot.start}
                                                onValueChange={(value) => updateTimeSlot(day.id, slot.id, "start", value)}
                                            >
                                                <SelectTrigger className="w-[120px]">
                                                    <SelectValue placeholder="Inicio" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {HOURS.map((hour) => (
                                                        <SelectItem key={`start-${hour.value}`} value={hour.value}>
                                                            {hour.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            <span className="text-muted-foreground">a</span>

                                            <Select value={slot.end} onValueChange={(value) => updateTimeSlot(day.id, slot.id, "end", value)}>
                                                <SelectTrigger className="w-[120px]">
                                                    <SelectValue placeholder="Fin" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {HOURS.map((hour) => (
                                                        <SelectItem key={`end-${hour.value}`} value={hour.value}>
                                                            {hour.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            <div className="flex-1 flex justify-end">
                                                {schedule[day.id].timeSlots.length > 1 && (
                                                    <Button variant="ghost" size="icon" onClick={() => removeTimeSlot(day.id, slot.id)}>
                                                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    <Button variant="outline" size="sm" className="mt-2" onClick={() => addTimeSlot(day.id)}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Añadir horario
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={saveAvailability} className="ml-auto">
                    <Save className="h-4 w-4 mr-2" />
                    Guardar disponibilidad
                </Button>
            </CardFooter>
        </Card>
    )
}

export default Schedule;

