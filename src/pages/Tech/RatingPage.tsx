import { useState } from "react"
import { Star, MessageSquare, Calendar, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useUsers } from "@/context/UsersContext"
import { Link } from "react-router-dom"
import { averageRating, formatDate, getRatingColor } from "@/lib/utils"

export const RatingPage = () => {
    const { reviews: techData } = useUsers()
    const [searchTerm, setSearchTerm] = useState("")

    // Filtrar reseñas según el término de búsqueda.
    const filteredReviews = techData && techData.length > 0 ?
        techData.filter((review) => review.comment.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        : null // Ordenar por fecha descendente

    // Función para renderizar estrellas
    const renderStars = (rating: number) => {
        return (
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                ))}
            </div>
        )
    }

    // Función para generar un ID de cliente anónimo basado en el ID de la reseña
    const getClientId = (reviewId: number) => {
        return `Cliente ${reviewId}`
    }

    // Función para obtener iniciales del ID de cliente
    const getInitials = (clientId: string) => {
        return clientId.substring(0, 2).toUpperCase()
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-6">Mis Reseñas</h1>
                <Button><Link to={'/panel/tecnico'}>Volver al panel</Link></Button>

            </div>

            {/* Resumen simple */}
            <Card className="mb-6">
                <CardContent className="py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center align-middle">
                        <div className="flex items-center gap-4 mb-4 md:mb-0">
                            <div className="bg-primary/10 p-4 rounded-full">
                                <Star className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{averageRating(techData).toFixed(1)}</h2>
                                <p className="text-sm text-muted-foreground">Calificación promedio</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="text-center px-4">
                                <p className="text-2xl font-bold">{techData?.length}</p>
                                <p className="text-sm text-muted-foreground">Total de reseñas</p>
                            </div>
                            <div className="text-center px-4">
                                <p className="text-2xl font-bold">{techData?.filter((r) => r.rating >= 4).length}</p>
                                <p className="text-sm text-muted-foreground">Reseñas positivas</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Barra de búsqueda */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    placeholder="Buscar en comentarios..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Lista de reseñas */}
            {filteredReviews?.length === 0 ? (
                <div className="text-center py-12">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No se encontraron reseñas</h3>
                    <p className="text-muted-foreground mt-2">No hay reseñas que coincidan con tu búsqueda.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredReviews?.map((review) => (
                        <Card key={review.id}>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarFallback>{getInitials(getClientId(review.id))}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-base">{getClientId(review.id)}</CardTitle>
                                            <div className="flex items-center gap-2 mt-1">
                                                {renderStars(review.rating)}
                                                <Badge variant="outline" className={getRatingColor(review.rating)}>
                                                    {review.rating.toFixed(1)}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            <span>{formatDate(review.date)}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm">{review.comment}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Paginación simple si hay muchas reseñas */}
            {/* {techData?.length > 2 && (
                <PaginationUi />
            )} */}
        </div>
    )
}

export default RatingPage;

