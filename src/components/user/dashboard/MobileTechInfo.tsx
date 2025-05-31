import { capitalizeFirstLetter } from '@/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, MapPin, Book, Contact } from 'lucide-react'
import { Technicians } from '@/types'

type MobileTechInfoProps = {
    selectedTechnician: Technicians
    setSelectedTechnician: (technician: Technicians | null) => void
    setAddBookingModal: (open: boolean) => void
}

const MobileTechInfo = ({ selectedTechnician, setSelectedTechnician, setAddBookingModal }: MobileTechInfoProps) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 shadow-lg rounded-t-xl z-50 md:w-1/3 md:right-10 md:left-auto">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold capitalize">
                        {selectedTechnician.firstName} {selectedTechnician.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground capitalize">{selectedTechnician.specialization}</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setSelectedTechnician(null)}>
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <div className="mt-2">
                <div className="flex flex-wrap gap-1 mt-2">
                    {selectedTechnician.services.map((service, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                            {capitalizeFirstLetter(service)}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="flex items-center mt-3 text-sm">
                <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">{selectedTechnician.address}</span>
            </div>

            <div className="flex gap-2 mt-4">
                <Button
                    onClick={() => setAddBookingModal(true)}
                    className="flex-1"
                >
                    <Book className="h-4 w-4 mr-2" />
                    Enviar reserva
                </Button>
                <Button className="flex-1" >
                    <Contact className="h-4 w-4 mr-2" />
                    Ver Perfil
                </Button>
            </div>
        </div>
    )
}

export default MobileTechInfo