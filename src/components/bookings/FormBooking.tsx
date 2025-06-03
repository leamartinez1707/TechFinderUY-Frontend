import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CreateBooking } from '@/types'

type FormBookingProps = {
    handleAddBooking: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
    setBookingData: React.Dispatch<React.SetStateAction<CreateBooking | null>>
    setAddBookingModal: React.Dispatch<React.SetStateAction<boolean>>
}

const FormBooking = ({ handleAddBooking, setBookingData, setAddBookingModal }: FormBookingProps) => {
    return (
        <form
            onSubmit={(e) => handleAddBooking(e)}
            className="space-y-4">
            <Label
                aria-label="Descripción del problema"
                htmlFor="problemDescription"
            >
                Descripción del problema
            </Label>
            <Input
                type="text"
                placeholder="Descripción del problema"
                id="problemDescription"
                aria-label="Descripción del problema"
                minLength={10}
                maxLength={200}
                required
                onChange={(e) => setBookingData(prev => ({ ...prev!, comment: e.target.value }))}
            />
            <Label
                aria-label="Fecha preferida para la reserva"
                htmlFor="dateOfBooking"
            >
                Fecha preferida para la reserva
            </Label>
            <Input
                id="dateOfBooking"
                type="date"
                aria-label="Fecha de la reserva"
                placeholder="Fecha preferida"
                required
                onChange={(e) => setBookingData(prev => ({ ...prev!, date: e.target.value }))}
            />
            <Button type="submit" className="w-full">
                Enviar reserva
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={() => setAddBookingModal(false)}>
                Cancelar
            </Button>
        </form>
    )
}

export default FormBooking