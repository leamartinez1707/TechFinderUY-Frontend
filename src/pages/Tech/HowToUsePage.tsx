import type React from "react"
import { useState } from "react"
import {
    User,
    Clock,
    Star,
    MessageSquare,
    MapPin,
    CheckCircle,
    AlertTriangle,
    ChevronDown,
    ChevronUp,
    Lightbulb,
    HelpCircle,
    Briefcase,
    Calendar,
    ThumbsUp,
    Shield,
    Award,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface GuideSection {
    id: string
    title: string
    icon: React.ReactNode
    content: React.ReactNode
}

const TechnicianGuide: React.FC = () => {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        profile: true,
        availability: false,
        reviews: false,
        service: false,
        visibility: false,
        faq: false,
    })

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }))
    }

    const guideSections: GuideSection[] = [
        {
            id: "profile",
            title: "Completar tu perfil",
            icon: <User className="h-5 w-5" />,
            content: (
                <div className="space-y-4">
                    <p>
                        Un perfil completo y detallado aumenta significativamente tus posibilidades de ser contactado por clientes
                        potenciales. Los usuarios confían más en técnicos con perfiles completos y profesionales.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base flex items-center">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    Información que debes incluir
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start">
                                        <span className="bg-primary/10 p-1 rounded mr-2 mt-0.5">
                                            <User className="h-3 w-3 text-primary" />
                                        </span>
                                        <span>Nombre completo y foto profesional</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-primary/10 p-1 rounded mr-2 mt-0.5">
                                            <Briefcase className="h-3 w-3 text-primary" />
                                        </span>
                                        <span>Especialización detallada y servicios específicos que ofreces</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-primary/10 p-1 rounded mr-2 mt-0.5">
                                            <MapPin className="h-3 w-3 text-primary" />
                                        </span>
                                        <span>Ubicación exacta para aparecer en búsquedas cercanas</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-primary/10 p-1 rounded mr-2 mt-0.5">
                                            <Clock className="h-3 w-3 text-primary" />
                                        </span>
                                        <span>Horarios de disponibilidad actualizados</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-primary/10 p-1 rounded mr-2 mt-0.5">
                                            <MessageSquare className="h-3 w-3 text-primary" />
                                        </span>
                                        <span>Datos de contacto verificados</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base flex items-center">
                                    <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                                    Errores comunes a evitar
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start">
                                        <span className="bg-destructive/10 p-1 rounded mr-2 mt-0.5">
                                            <AlertTriangle className="h-3 w-3 text-destructive" />
                                        </span>
                                        <span>Dejar campos importantes vacíos o incompletos</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-destructive/10 p-1 rounded mr-2 mt-0.5">
                                            <AlertTriangle className="h-3 w-3 text-destructive" />
                                        </span>
                                        <span>Usar información genérica o poco específica</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-destructive/10 p-1 rounded mr-2 mt-0.5">
                                            <AlertTriangle className="h-3 w-3 text-destructive" />
                                        </span>
                                        <span>No actualizar la información cuando cambia</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-destructive/10 p-1 rounded mr-2 mt-0.5">
                                            <AlertTriangle className="h-3 w-3 text-destructive" />
                                        </span>
                                        <span>Usar fotos de baja calidad o no profesionales</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-destructive/10 p-1 rounded mr-2 mt-0.5">
                                            <AlertTriangle className="h-3 w-3 text-destructive" />
                                        </span>
                                        <span>Proporcionar ubicación imprecisa o incorrecta</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Importante</AlertTitle>
                        <AlertDescription>
                            Los técnicos con perfiles completos reciben hasta un 75% más de contactos que aquellos con perfiles
                            incompletos. Dedica tiempo a completar cada sección con información precisa y profesional.
                        </AlertDescription>
                    </Alert>
                </div>
            ),
        },
        {
            id: "availability",
            title: "Gestionar tu disponibilidad",
            icon: <Clock className="h-5 w-5" />,
            content: (
                <div className="space-y-4">
                    <p>
                        Mantener tu disponibilidad actualizada es crucial para que los clientes puedan encontrarte cuando te
                        necesitan. Una gestión eficiente de tu horario te ayudará a organizar mejor tu trabajo y evitar conflictos.
                    </p>

                    <div className="bg-muted p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-primary" />
                            Recomendaciones para gestionar tu disponibilidad
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Actualiza tu disponibilidad semanalmente para reflejar cambios en tu agenda</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Establece franjas horarias realistas que puedas cumplir</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>
                                    Considera añadir disponibilidad en horarios extendidos o fines de semana para captar más clientes
                                </span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Bloquea tiempo para desplazamientos entre servicios</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Actualiza inmediatamente tu disponibilidad cuando aceptes un trabajo fuera de la plataforma</span>
                            </li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Configuración efectiva</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <p className="text-sm mb-2">Ejemplo de configuración recomendada:</p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between items-center p-2 bg-primary/5 rounded">
                                        <span className="font-medium">Lunes a Viernes</span>
                                        <div className="flex gap-1">
                                            <Badge variant="outline">9:00 - 13:00</Badge>
                                            <Badge variant="outline">15:00 - 19:00</Badge>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-primary/5 rounded">
                                        <span className="font-medium">Sábado</span>
                                        <Badge variant="outline">10:00 - 14:00</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Alert className="h-fit">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Evita estos errores</AlertTitle>
                            <AlertDescription>
                                <ul className="mt-2 space-y-1 text-sm">
                                    <li>• Mostrar disponibilidad 24/7 poco realista</li>
                                    <li>• No actualizar cuando ya estás ocupado</li>
                                    <li>• Establecer horarios demasiado restrictivos</li>
                                    <li>• Ignorar la configuración de disponibilidad</li>
                                </ul>
                            </AlertDescription>
                        </Alert>
                    </div>
                </div>
            ),
        },
        {
            id: "reviews",
            title: "Gestionar reseñas y comentarios",
            icon: <Star className="h-5 w-5" />,
            content: (
                <div className="space-y-4">
                    <p>
                        Las reseñas son uno de los factores más importantes para que los clientes te elijan. Gestionar adecuadamente
                        las reseñas puede marcar la diferencia en tu reputación online.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <h4 className="font-medium">Responder a las reseñas positivas</h4>
                            <div className="bg-muted p-4 rounded-lg">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="bg-green-100 p-2 rounded-full">
                                        <Star className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Reseña de cliente:</p>
                                        <p className="text-sm italic">
                                            "Excelente servicio, muy profesional y rápido. Solucionó mi problema en minutos."
                                        </p>
                                    </div>
                                </div>
                                <Separator className="my-3" />
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-2 rounded-full">
                                        <MessageSquare className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Respuesta recomendada:</p>
                                        <p className="text-sm italic">
                                            "¡Muchas gracias por tu comentario! Me alegra haber podido ayudarte. Estoy a tu disposición para
                                            futuros servicios."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-medium">Responder a las reseñas negativas</h4>
                            <div className="bg-muted p-4 rounded-lg">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="bg-red-100 p-2 rounded-full">
                                        <Star className="h-4 w-4 text-red-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Reseña de cliente:</p>
                                        <p className="text-sm italic">"El técnico llegó tarde y no resolvió completamente mi problema."</p>
                                    </div>
                                </div>
                                <Separator className="my-3" />
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-2 rounded-full">
                                        <MessageSquare className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Respuesta recomendada:</p>
                                        <p className="text-sm italic">
                                            "Lamento mucho tu experiencia. Me gustaría tener la oportunidad de solucionar completamente tu
                                            problema. Por favor, contáctame para programar una visita de seguimiento sin costo adicional."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Consejos importantes</AlertTitle>
                        <AlertDescription>
                            <ul className="mt-2 space-y-1 text-sm">
                                <li>• Responde a todas las reseñas, tanto positivas como negativas</li>
                                <li>• Mantén siempre un tono profesional y respetuoso</li>
                                <li>• Responde con prontitud, idealmente en menos de 48 horas</li>
                                <li>• Ofrece soluciones concretas ante problemas mencionados</li>
                                <li>• Agradece siempre el tiempo que el cliente dedicó a dejar su opinión</li>
                            </ul>
                        </AlertDescription>
                    </Alert>

                    <div className="bg-primary/5 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-2 text-primary" />
                            Cómo conseguir más reseñas positivas
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Solicita amablemente a tus clientes satisfechos que dejen una reseña</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Envía un mensaje de seguimiento después del servicio</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Supera las expectativas en cada servicio que realizas</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Resuelve rápidamente cualquier problema que pueda surgir</span>
                            </li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            id: "service",
            title: "Brindar un servicio de calidad",
            icon: <Award className="h-5 w-5" />,
            content: (
                <div className="space-y-4">
                    <p>
                        La calidad del servicio que brindas es lo que determinará tu éxito a largo plazo en la plataforma. Los
                        clientes satisfechos no solo vuelven, sino que te recomiendan a otros.
                    </p>

                    <Tabs defaultValue="before" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="before">Antes del servicio</TabsTrigger>
                            <TabsTrigger value="during">Durante el servicio</TabsTrigger>
                            <TabsTrigger value="after">Después del servicio</TabsTrigger>
                        </TabsList>
                        <TabsContent value="before" className="p-4 border rounded-md mt-2">
                            <h4 className="font-medium mb-3">Preparación para el servicio</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                    <span>Confirma la cita con al menos 24 horas de anticipación</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                    <span>Solicita información detallada sobre el problema a resolver</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                    <span>Prepara las herramientas y repuestos que podrías necesitar</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                    <span>Planifica tu ruta para llegar puntualmente</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                    <span>Investiga soluciones para el problema específico del cliente</span>
                                </li>
                            </ul>
                        </TabsContent>
                        <TabsContent value="during" className="p-4 border rounded-md mt-2">
                            <h4 className="font-medium mb-3">Durante la prestación del servicio</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                    <span>Llega puntualmente o avisa con anticipación si hay algún retraso</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                    <span>Preséntate profesionalmente y explica el proceso que seguirás</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                    <span>Mantén al cliente informado sobre lo que estás haciendo</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                    <span>Sé transparente sobre costos adicionales si surgen</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                    <span>Trabaja de manera ordenada y limpia</span>
                                </li>
                            </ul>
                        </TabsContent>
                        <TabsContent value="after" className="p-4 border rounded-md mt-2">
                            <h4 className="font-medium mb-3">Seguimiento post-servicio</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                    <span>Explica al cliente lo que has hecho y cómo evitar problemas futuros</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                    <span>Proporciona una factura o recibo detallado</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                    <span>Realiza un seguimiento 24-48 horas después para verificar que todo funciona correctamente</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                    <span>Agradece al cliente por confiar en tus servicios</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                    <span>Invita amablemente a dejar una reseña en la plataforma</span>
                                </li>
                            </ul>
                        </TabsContent>
                    </Tabs>

                    <Alert className="bg-amber-50 border-amber-200">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <AlertTitle className="text-amber-800">Compromisos importantes</AlertTitle>
                        <AlertDescription className="text-amber-700">
                            <ul className="mt-2 space-y-1 text-sm">
                                <li>• Nunca prometas resultados que no puedas garantizar</li>
                                <li>• Respeta la privacidad y propiedad del cliente</li>
                                <li>• Sé honesto sobre tus capacidades y limitaciones</li>
                                <li>• Cumple siempre con los tiempos acordados</li>
                                <li>• Ofrece garantía por tu trabajo</li>
                            </ul>
                        </AlertDescription>
                    </Alert>

                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center text-green-800">
                            <Shield className="h-4 w-4 mr-2 text-green-600" />
                            Beneficios de un servicio excepcional
                        </h4>
                        <ul className="space-y-2 text-sm text-green-700">
                            <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-600 mr-2 shrink-0 mt-0.5" />
                                <span>Mayor tasa de clientes recurrentes</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-600 mr-2 shrink-0 mt-0.5" />
                                <span>Recomendaciones y referencias de clientes satisfechos</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-600 mr-2 shrink-0 mt-0.5" />
                                <span>Mejor posicionamiento en los resultados de búsqueda</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-600 mr-2 shrink-0 mt-0.5" />
                                <span>Posibilidad de cobrar tarifas más altas por tu experiencia</span>
                            </li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            id: "visibility",
            title: "Aumentar tu visibilidad",
            icon: <Lightbulb className="h-5 w-5" />,
            content: (
                <div className="space-y-4">
                    <p>
                        Aumentar tu visibilidad en la plataforma te ayudará a conseguir más clientes y oportunidades de trabajo.
                        Sigue estas estrategias para destacar entre otros técnicos.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Optimiza tu perfil</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                        <span>Utiliza palabras clave relevantes en tu descripción</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                        <span>Destaca tus habilidades y certificaciones más importantes</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                        <span>Actualiza regularmente tus servicios ofrecidos</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                        <span>Usa una foto profesional y de buena calidad</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Amplía tu disponibilidad</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                        <span>Ofrece servicios en horarios extendidos</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                        <span>Considera trabajar fines de semana para captar más clientes</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                        <span>Indica si ofreces servicios de emergencia</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                        <span>Amplía tu área de cobertura si es posible</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center">
                            <Star className="h-4 w-4 mr-2 text-primary" />
                            Estrategias para destacar
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Responde rápidamente a las solicitudes de los clientes</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Ofrece servicios especializados o nichos que pocos técnicos cubren</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Mantén una tasa de aceptación de trabajos alta</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Comparte consejos útiles con tus clientes para generar confianza</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                <span>Ofrece garantías por tu trabajo</span>
                            </li>
                        </ul>
                    </div>

                    <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>Consejo profesional</AlertTitle>
                        <AlertDescription>
                            Los técnicos que responden a las solicitudes en menos de 1 hora tienen un 50% más de probabilidades de ser
                            contratados. Mantén las notificaciones activadas y revisa la plataforma regularmente.
                        </AlertDescription>
                    </Alert>
                </div>
            ),
        },
        {
            id: "faq",
            title: "Preguntas frecuentes",
            icon: <HelpCircle className="h-5 w-5" />,
            content: (
                <div className="space-y-4">
                    <p>
                        Aquí encontrarás respuestas a las preguntas más comunes que los técnicos suelen tener sobre la plataforma.
                    </p>

                    <div className="space-y-4">
                        <div className="border rounded-lg overflow-hidden">
                            <div className="bg-muted p-3">
                                <h4 className="font-medium">¿Cómo recibo pagos por mis servicios?</h4>
                            </div>
                            <div className="p-3">
                                <p className="text-sm">
                                    Los pagos se procesan a través de la plataforma. Puedes recibir pagos directamente de los clientes o a
                                    través de nuestro sistema de pagos integrado. Los fondos se transfieren a tu cuenta bancaria
                                    registrada en un plazo de 1-3 días hábiles después de completar el servicio.
                                </p>
                            </div>
                        </div>

                        <div className="border rounded-lg overflow-hidden">
                            <div className="bg-muted p-3">
                                <h4 className="font-medium">¿Qué hago si tengo un problema con un cliente?</h4>
                            </div>
                            <div className="p-3">
                                <p className="text-sm">
                                    Si tienes algún problema con un cliente, intenta resolverlo directamente de manera profesional. Si no
                                    puedes llegar a una solución, contacta a nuestro equipo de soporte a través de la sección "Ayuda" en
                                    tu panel de control. Responderemos en un plazo máximo de 24 horas.
                                </p>
                            </div>
                        </div>

                        <div className="border rounded-lg overflow-hidden">
                            <div className="bg-muted p-3">
                                <h4 className="font-medium">¿Cómo puedo mejorar mi posición en los resultados de búsqueda?</h4>
                            </div>
                            <div className="p-3">
                                <p className="text-sm">
                                    Tu posición en los resultados de búsqueda depende de varios factores: calificaciones y reseñas, tasa
                                    de respuesta, perfil completo, disponibilidad y ubicación. Mantén un buen rendimiento en estos
                                    aspectos para mejorar tu visibilidad.
                                </p>
                            </div>
                        </div>

                        <div className="border rounded-lg overflow-hidden">
                            <div className="bg-muted p-3">
                                <h4 className="font-medium">¿Puedo ofrecer descuentos a clientes recurrentes?</h4>
                            </div>
                            <div className="p-3">
                                <p className="text-sm">
                                    Sí, puedes ofrecer descuentos personalizados a clientes recurrentes. Utiliza la función "Ofertas
                                    especiales" en tu panel para crear y gestionar descuentos para clientes específicos o para todos tus
                                    servicios.
                                </p>
                            </div>
                        </div>

                        <div className="border rounded-lg overflow-hidden">
                            <div className="bg-muted p-3">
                                <h4 className="font-medium">¿Qué comisión cobra la plataforma por cada servicio?</h4>
                            </div>
                            <div className="p-3">
                                <p className="text-sm">
                                    La plataforma cobra una comisión del 10% por cada servicio completado. Esta comisión cubre el uso de
                                    la plataforma, el procesamiento de pagos, el soporte al cliente y las herramientas de gestión que
                                    ofrecemos.
                                </p>
                            </div>
                        </div>

                        <div className="border rounded-lg overflow-hidden">
                            <div className="bg-muted p-3">
                                <h4 className="font-medium">¿Cómo puedo actualizar mis habilidades y servicios?</h4>
                            </div>
                            <div className="p-3">
                                <p className="text-sm">
                                    Puedes actualizar tus habilidades y servicios en cualquier momento desde la sección "Mi perfil" &gt;
                                    "Información técnica". Recomendamos revisar y actualizar esta información regularmente para reflejar
                                    tus capacidades actuales.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Alert className="bg-blue-50 border-blue-200">
                        <HelpCircle className="h-4 w-4 text-blue-600" />
                        <AlertTitle className="text-blue-800">¿Necesitas más ayuda?</AlertTitle>
                        <AlertDescription className="text-blue-700">
                            Si tienes preguntas adicionales, puedes contactar a nuestro equipo de soporte a través del chat en vivo o
                            enviando un correo a soporte@tecnicosenlinea.com. Estamos disponibles de lunes a viernes de 9:00 a 18:00
                            horas.
                        </AlertDescription>
                    </Alert>
                </div>
            ),
        },
    ]

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Guía para Técnicos</h1>
                    <p className="text-muted-foreground">Todo lo que necesitas saber para tener éxito en nuestra plataforma</p>
                </div>

                <Alert className="mb-8 bg-primary/10 border-primary/20">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    <AlertTitle>Maximiza tu potencial</AlertTitle>
                    <AlertDescription>
                        Los técnicos que siguen estas recomendaciones tienen un 80% más de probabilidades de recibir solicitudes de
                        servicio y mantener una alta calificación.
                    </AlertDescription>
                </Alert>

                <div className="space-y-4">
                    {guideSections.map((section) => (
                        <Card key={section.id} className="overflow-hidden">
                            <div
                                className={`p-4 flex items-center justify-between cursor-pointer ${expandedSections[section.id] ? "border-b" : ""
                                    }`}
                                onClick={() => toggleSection(section.id)}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="bg-primary/10 p-2 rounded-full">{section.icon}</div>
                                    <h2 className="text-xl font-semibold">{section.title}</h2>
                                </div>
                                <Button variant="ghost" size="icon">
                                    {expandedSections[section.id] ? (
                                        <ChevronUp className="h-5 w-5" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5" />
                                    )}
                                </Button>
                            </div>
                            {expandedSections[section.id] && <CardContent className="pt-6">{section.content}</CardContent>}
                        </Card>
                    ))}
                </div>

                <div className="mt-8 p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">
                        Esta guía se actualiza regularmente. Última actualización: Marzo 2024
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TechnicianGuide

