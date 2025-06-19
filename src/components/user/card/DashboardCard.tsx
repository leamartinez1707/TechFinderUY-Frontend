import { capitalizeFirstLetter } from "@/utils";
import FavoriteIcon from "../FavoriteIcon";
import { Award, Book, Contact, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Technicians } from "@/types";
import { averageRating } from "@/lib/utils";
import { useUsers } from "@/context/UsersContext";
import { Link } from "react-router-dom";

type DashboardCardProps = {
    tech: (Technicians & {
        distance?: number;
    })
    setAddBookingModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardCard = ({ tech, setAddBookingModal }: DashboardCardProps) => {
    const { allReviews } = useUsers()
    const reviews = allReviews.filter(review => review.technician.id === tech.id)

    return (
        <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    {/* <div className="relative">
                            <img
                                src={avatar}
                                alt={name}
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100"
                            />
                            {tech && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                    <Shield className="w-3 h-3 text-white" />
                                </div>
                            )}
                        </div> */}
                    <div>
                        <h3 className="font-semibold text-gray-900 text-lg capitalize">{tech.firstName} {tech.lastName}</h3>
                        <p className="text-blue-600 text-sm font-medium capitalize">{tech.specialization}</p>
                    </div>
                </div>

                <FavoriteIcon technicianId={tech.id} />
            </div>

            {/* Specialties */}
            <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                    {tech.services.map((service, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full text-center"
                        >
                            {capitalizeFirstLetter(service)}
                        </span>
                    ))}
                </div>
            </div>

            {/* Rating and Stats */}
            <div className="flex flex-col lg:flex-row gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{reviews?.length ? averageRating(reviews) : 'Sin datos'}</span>
                    <span className="text-gray-500">{'('}{reviews?.length ? reviews.length : 'Sin datos'}{')'}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                    <Award className="w-4 h-4" />
                    <span>trabajos completados</span>
                </div>
            </div>

            {/* Location and Availability */}
            <div className="flex items-center justify-between mb-4 text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{tech.distance ? tech.distance.toString().substring(0, 5) + ' km' : 'No hay datos'}</span>
                </div>
                {/* <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${availability === 'Disponible' ? 'bg-green-500' :
                            availability === 'Ocupado' ? 'bg-yellow-500' : 'bg-red-500'
                            }`} />
                        <span className={`text-sm font-medium ${availability === 'Disponible' ? 'text-green-600' :
                            availability === 'Ocupado' ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                            {availability}
                        </span>
                    </div> */}
            </div>

            {/* Response Time and Price */}
            {/* <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Responde en {responseTime}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{priceRange}</span>
                </div> */}

            {/* Action Buttons */}
            {/* <div className="flex gap-2">
                    <button
                        onClick={() => onSelect(id)}
                        className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        <Phone className="w-4 h-4" />
                        Contactar
                    </button>
                    <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <MessageCircle className="w-4 h-4" />
                    </button>
                </div> */}
            <div className="mt-2 flex justify-center items-center gap-2">
                <Button
                    onClick={() => setAddBookingModal(true)}
                    className="flex-1"
                >
                    <Book className="h-4 w-4 mr-1" />
                    Enviar reserva
                </Button>
                <Button className="flex-1">
                    <Contact className="h-4 w-4 mr-1" />
                    <Link to={`/calificacion-tecnico/${tech.id}`}>Ver Perfil</Link>
                </Button>
            </div>
        </div>
    )
}

export default DashboardCard