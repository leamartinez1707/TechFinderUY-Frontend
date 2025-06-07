import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import FavoriteIcon from '@/components/user/FavoriteIcon';
import type { Technicians, UserFavorites } from '@/types';
import { capitalizeFirstLetter } from '@/utils';
import { Calendar } from 'lucide-react';

type TechCardProps = {
    technician: UserFavorites;
    setSelectedTechnician: React.Dispatch<React.SetStateAction<Technicians | null>>
    setAddBookingModal: React.Dispatch<React.SetStateAction<boolean>>
}

const TechCard = ({ technician: tech, setAddBookingModal, setSelectedTechnician }: TechCardProps) => {
    return (
        <Card key={tech?.technician?.id} className="overflow-hidden">
            {/* <CardHeader className="relative p-0">
                                <div className="aspect-video w-full overflow-hidden">
                                    <img
                                        src={tech?.technician?.imageUrl}
                                        alt={tech?.technician?.name}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </CardHeader> */}
            <CardContent className="flex flex-col justify-between h-full p-6">
                <CardDescription className="mb-4">
                    <div className='flex items-center justify-between'>
                        <CardTitle className="text-xl mb-2 text-black capitalize">{tech.technician.user.firstName} {tech.technician.user.lastName}</CardTitle>
                        <FavoriteIcon technicianId={tech.technician.id} />
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                        <span className="font-medium text-gray-800 capitalize">{tech?.technician?.specialization}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2 mb-4">
                        {tech?.technician?.services.length > 0 && tech?.technician?.services.map((service, index) => (
                            <Badge key={index} className="text-xs" >
                                {capitalizeFirstLetter(service)}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground capitalize">{tech?.technician?.user.address}</span>
                    </div>
                    <span className="text-muted-foreground">{tech.technician.user.email}</span>
                </CardDescription>

                <div className="flex gap-3">
                    <Button
                        className="flex-1"
                        onClick={() => {
                            const selectedTech: Technicians = {
                                id: tech?.technician?.id,
                                firstName: tech?.technician?.user.firstName,
                                lastName: tech?.technician?.user.lastName,
                                specialization: tech?.technician?.specialization,
                                services: tech?.technician?.services,
                                latitude: tech?.technician?.latitude,
                                longitude: tech?.technician?.longitude,
                                username: tech?.technician?.user.username,
                                phone: tech?.technician?.user.phone,
                                email: tech?.technician?.user.email,
                                address: tech?.technician?.user.address,
                            };
                            setSelectedTechnician(selectedTech);
                            setAddBookingModal(true)
                        }}
                    >
                        <Calendar className="h-4 w-4 mr-2" />
                        Reservar
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default TechCard