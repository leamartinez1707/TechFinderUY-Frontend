import ContactForm from "@/components/contact/ContactForm";
import ContactHeader from "@/components/contact/ContactHeader";
import { Wrench } from "lucide-react";



const ContactPage = () => {
  return (
    <div>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-24 max-w-5xl">
          <ContactHeader />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <h3 className="text-xl font-semibold mb-4">Como podemos ayudarte</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Wrench className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Problemas técnicos</h4>
                      <p className="text-muted-foreground text-sm mt-1">
                        Problemas con nuestra plataforma o servicios
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                        <path d="M16 13H8" />
                        <path d="M16 17H8" />
                        <path d="M10 9H8" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Feedback de los servicios</h4>
                      <p className="text-muted-foreground text-sm mt-1">
                        Compartí tu experiencia con nuestros técnicos
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z" />
                        <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z" />
                        <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z" />
                        <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Solicitud de funcionalidades </h4>
                      <p className="text-muted-foreground text-sm mt-1">
                        Sugiere mejoras o nuevas funcionalidades
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t">
                  <h4 className="font-medium mb-2">Contacto directo</h4>
                  <p className="text-muted-foreground text-sm mb-4">
                    Necesitas una respuesta inmediata? Contactanos directamente:
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Email:</span>{" "}
                      <a href="mailto:leandromartinez.dev@gmail.com" className="text-primary hover:underline">
                        leandromartinez.dev@gmail.com
                      </a>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Teléfono:</span>{" "}
                      <a href="tel:+18005551234" className="text-primary hover:underline">
                        (598) 95 220 063
                      </a>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Horario:</span>{" "}
                      <span>Lunes a Viernes 8am-22pm</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage