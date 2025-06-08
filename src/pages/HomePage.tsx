import { useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  Search,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { motion } from "motion/react"

const HomePage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      question: "¿Cómo encuentro un técnico para mi problema?",
      answer:
        "Simplemente ingresa tu ubicación, selecciona el tipo de servicio que necesitas y te mostraremos los técnicos disponibles cerca de ti. Puedes filtrar por calificaciones, disponibilidad y especialidad.",
    },
    {
      question: "¿Cómo me registro como técnico?",
      answer:
        "Regístrate como técnico completando el formulario de registro, verificando tus datos y especificando tus habilidades y servicios. Una vez aprobado, podrás empezar a recibir solicitudes de servicio.",
    },
    {
      question: "¿Cuánto cuesta usar la plataforma?",
      answer:
        "Para los clientes, el uso de la plataforma es completamente gratuito. Los técnicos pagan una pequeña comisión solo cuando completan un servicio exitosamente.",
    },
    {
      question: "¿Cómo se garantiza la calidad del servicio?",
      answer:
        "Todos los técnicos pasan por un proceso de verificación. Además, el sistema de calificaciones y reseñas permite a los usuarios evaluar la calidad del servicio recibido, ayudando a mantener altos estándares.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <motion.section
        className="flex flex-wrap items-center gap-6 py-8 text-center mx-auto justify-center"
      >
        <motion.a
          transition={{ duration: 0.5, ease: 'circOut' }}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          href="#how-it-works"
          className="text-lg font-medium hover:text-primary transition-colors hover:underline scroll-smooth"
        >
          Cómo funciona
        </motion.a>
        <motion.a
          transition={{ duration: 0.5, ease: 'circOut' }}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          href="#benefits"
          className="text-lg font-medium hover:text-primary transition-colors hover:underline"
        >
          Beneficios
        </motion.a>
        <motion.a
          transition={{ duration: 0.5, ease: 'circOut' }}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          href="#testimonials"
          className="text-lg font-medium hover:text-primary transition-colors hover:underline"
        >
          Testimonios
        </motion.a>
        <motion.a
          transition={{ duration: 0.5, ease: 'circOut' }}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          href="#faq"
          className="text-lg font-medium hover:text-primary transition-colors hover:underline"
        >
          FAQ
        </motion.a>
      </motion.section>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: "anticipate" }}
        className="bg-gradient-to-r from-primary/5 to-primary/10 py-10 md:py-24"
        id="#how-it-works"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col justify-center items-center mx-auto space-y-6">
              <h1 className="text-5xl md:text-6xl text-left">buscoTécnico</h1>
              <Badge className="mb-4">
                La plataforma #1 de servicios técnicos
              </Badge>
              <p className="text-4xl md:text-5xl font-bold tracking-tight text-center">
                Conectamos expertos técnicos con quienes los necesitan
              </p>
              <p className="text-lg text-muted-foreground text-center">
                Soluciones rápidas y confiables para tus problemas tecnológicos.
                Encuentra técnicos calificados cerca de ti u ofrece tus servicios a
                miles de clientes potenciales.
              </p>
              <Tabs defaultValue="client" className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="client">Busco un técnico</TabsTrigger>
                  <TabsTrigger value="technician">Soy técnico</TabsTrigger>
                </TabsList>
                <TabsContent value="client" className="space-y-4 pt-4">
                  <Button className="w-full">
                    <Link to="/register" className="flex items-center">
                      Encontrar técnicos ahora
                    </Link>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </TabsContent>
                <TabsContent value="technician" className="space-y-4 pt-4">
                  <Button className="w-full">
                    <Link to="/register" className="flex items-center">
                      Registrarme como técnico
                    </Link>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary/10 rounded-full"></div>
              <div className="absolute -bottom-10 right-10 w-32 h-32 bg-primary/10 rounded-full"></div>
              <img
                src="https://images.unsplash.com/photo-1550041473-d296a3a8a18a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaG5pY2lhbnxlbnwwfHwwfHx8MA%3D%3D"
                alt="Técnico ayudando a un cliente"
                className="rounded-lg shadow-xl relative z-10"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className="py-12 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center p-4">
              <p className="text-3xl md:text-4xl font-bold text-primary">2,500+</p>
              <p className="text-sm text-muted-foreground mt-1">
                Técnicos verificados
              </p>
            </div>
            <div className="text-center p-4">
              <p className="text-3xl md:text-4xl font-bold text-primary">15,000+</p>
              <p className="text-sm text-muted-foreground mt-1">
                Clientes satisfechos
              </p>
            </div>
            <div className="text-center p-4">
              <p className="text-3xl md:text-4xl font-bold text-primary">30,000+</p>
              <p className="text-sm text-muted-foreground mt-1">
                Servicios completados
              </p>
            </div>
            <div className="text-center p-4">
              <p className="text-3xl md:text-4xl font-bold text-primary">4.8/5</p>
              <p className="text-sm text-muted-foreground mt-1">
                Calificación promedio
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* How it works */}
      <motion.section
        id="how-it-works"
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        className="py-16 bg-muted/30"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Cómo funciona</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Un proceso simple y eficiente para conectar técnicos con clientes
            </p>
          </div>

          <Tabs defaultValue="client" className="w-full max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="client">Para clientes</TabsTrigger>
              <TabsTrigger value="technician">Para técnicos</TabsTrigger>
            </TabsList>
            <TabsContent value="client" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-white">
                  <CardContent className="pt-6">
                    <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                      <Search className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">Busca</h3>
                    <p className="text-sm text-muted-foreground">
                      Ingresa tu ubicación y el tipo de servicio que necesitas para
                      encontrar técnicos disponibles cerca de ti.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardContent className="pt-6">
                    <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">Conecta</h3>
                    <p className="text-sm text-muted-foreground">
                      Revisa perfiles, calificaciones y disponibilidad para elegir el
                      técnico que mejor se adapte a tus necesidades.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardContent className="pt-6">
                    <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">Resuelve</h3>
                    <p className="text-sm text-muted-foreground">
                      Recibe el servicio, paga de forma segura y califica tu
                      experiencia para ayudar a otros usuarios.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="technician" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-white">
                  <CardContent className="pt-6">
                    <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">Regístrate</h3>
                    <p className="text-sm text-muted-foreground">
                      Crea tu perfil profesional, especifica tus habilidades,
                      servicios y área de cobertura.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardContent className="pt-6">
                    <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">Gestiona</h3>
                    <p className="text-sm text-muted-foreground">
                      Establece tu disponibilidad, recibe solicitudes y coordina
                      servicios directamente con los clientes.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardContent className="pt-6">
                    <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">Crece</h3>
                    <p className="text-sm text-muted-foreground">
                      Brinda servicios de calidad, recibe calificaciones positivas y
                      aumenta tu base de clientes.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        id="benefits"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Beneficios</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Una plataforma diseñada para satisfacer las necesidades tanto de
              clientes como de técnicos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-6">Para clientes</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Técnicos verificados y calificados</p>
                    <p className="text-sm text-muted-foreground">
                      Todos los técnicos pasan por un proceso de verificación para
                      garantizar su profesionalismo.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Búsqueda por ubicación</p>
                    <p className="text-sm text-muted-foreground">
                      Encuentra técnicos cercanos a tu ubicación para una respuesta
                      más rápida.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Sistema de calificaciones transparente</p>
                    <p className="text-sm text-muted-foreground">
                      Revisa las opiniones de otros usuarios antes de elegir un
                      técnico.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Pagos seguros</p>
                    <p className="text-sm text-muted-foreground">
                      Sistema de pagos protegido que garantiza la satisfacción del
                      servicio.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Para técnicos</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Más clientes potenciales</p>
                    <p className="text-sm text-muted-foreground">
                      Accede a una amplia base de clientes buscando tus servicios
                      específicos.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Gestión flexible de disponibilidad</p>
                    <p className="text-sm text-muted-foreground">
                      Establece tus propios horarios y áreas de servicio según tu
                      conveniencia.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Perfil profesional destacado</p>
                    <p className="text-sm text-muted-foreground">
                      Muestra tus habilidades, experiencia y reseñas para atraer más
                      clientes.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Herramientas de crecimiento</p>
                    <p className="text-sm text-muted-foreground">
                      Analíticas, consejos y recursos para mejorar tu servicio y
                      aumentar tus ingresos.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        id="testimonials"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
        className="py-16 bg-muted/30"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Lo que dicen nuestros usuarios</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Experiencias reales de clientes y técnicos que utilizan nuestra
              plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm mb-4">
                  "Encontré un técnico en menos de 10 minutos. Llegó puntual,
                  resolvió mi problema rápidamente y a un precio justo.
                  ¡Definitivamente volveré a usar esta plataforma!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-muted mr-3"></div>
                  <div>
                    <p className="font-medium text-sm">María González</p>
                    <p className="text-xs text-muted-foreground">Cliente</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm mb-4">
                  "Como técnico, esta plataforma ha transformado mi negocio. He
                  aumentado mis clientes en un 40% y puedo gestionar mi agenda de
                  forma eficiente. El sistema de pagos es rápido y seguro."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-muted mr-3"></div>
                  <div>
                    <p className="font-medium text-sm">Carlos Rodríguez</p>
                    <p className="text-xs text-muted-foreground">
                      Técnico en reparación de computadoras
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm mb-4">
                  "Mi router dejó de funcionar y necesitaba solucionarlo
                  urgentemente por mi trabajo. En la plataforma encontré un técnico
                  especializado que vino el mismo día. Servicio excelente y
                  profesional."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-muted mr-3"></div>
                  <div>
                    <p className="font-medium text-sm">Laura Martínez</p>
                    <p className="text-xs text-muted-foreground">Cliente</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        id="faq"
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Preguntas frecuentes</h2>
            <p className="text-muted-foreground mt-2">
              Respuestas a las dudas más comunes sobre nuestra plataforma
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-4 text-left font-medium focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="p-4 pt-0 text-sm text-muted-foreground">
                    <Separator className="mb-4" />
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
        className="py-16 bg-primary/10 mb-20"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Únete a miles de usuarios que ya están aprovechando nuestra plataforma
            para encontrar soluciones técnicas o expandir su negocio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Link to="/login" className="flex items-center">
                Buscar técnicos ahora
              </Link>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              <Link to="/register" className="flex items-center">
                Registrarme como técnico
              </Link>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default HomePage

