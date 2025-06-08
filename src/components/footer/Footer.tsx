import { Separator } from '@radix-ui/react-separator'
import { Link } from 'react-router-dom'
import { PenToolIcon as Tool } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-semibold mb-4">buscoTécnico</h3>
                        <div className="flex items-center gap-2 mb-4">
                            <Tool className="h-5 w-5 text-primary" />
                            <span className="font-bold">buscoTécnico</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Conectando expertos técnicos con quienes los necesitan desde 2025.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Enlaces rápidos</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to={'#'} className="text-muted-foreground hover:text-primary transition-colors">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to={"#how-it-works"} className="text-muted-foreground hover:text-primary transition-colors">
                                    Cómo funciona
                                </Link>
                            </li>
                            <li>
                                <Link to={"#benefits"} className="text-muted-foreground hover:text-primary transition-colors">
                                    Beneficios
                                </Link>
                            </li>
                            <li>
                                <Link to={"#testimonials"} className="text-muted-foreground hover:text-primary transition-colors">
                                    Testimonios
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Servicios</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="text-muted-foreground hover:text-primary transition-colors">
                                Reparación de computadoras
                            </li>
                            <li className="text-muted-foreground hover:text-primary transition-colors">
                                Soporte de redes
                            </li>
                            <li className="text-muted-foreground hover:text-primary transition-colors">
                                Reparación de celulares
                            </li>
                            <li className="text-muted-foreground hover:text-primary transition-colors">
                                Instalación de software
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Contacto</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="text-muted-foreground">info@buscotecnico.com</li>
                            <li className="text-muted-foreground">+598 95220063</li>
                            <li className="text-muted-foreground">Montevideo, Uruguay</li>
                        </ul>
                    </div>
                </div>
                <Separator className="my-8" />
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} buscoTécnico. Todos los derechos reservados.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link to={'#'} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Términos y condiciones
                        </Link>
                        <Link to={'#'} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Política de privacidad
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer