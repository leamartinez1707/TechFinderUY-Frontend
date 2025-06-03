import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { enqueueSnackbar } from "notistack";
import emailjs from "@emailjs/browser";

const contactFormSchema = z.object({
    name: z.string().min(3, { message: "El nombre debe tener al menos 3 carácteres" }),
    email: z.string().email({ message: "Por favor utiliza un correo válido" }),
    phone: z.string(),
    issueType: z.string({
        required_error: "Por favor selecciona un tipo de problema",
    }),
    subject: z.string().min(5, { message: "El asunto debe tener al menos 5 carácteres" }),
    message: z.string().min(10, { message: "El mensaje debe contener al menos 10 carácteres" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const issueTypes = [
    { value: "technical", label: "Problema técnico" },
    { value: "billing", label: "Pregunta de pagos" },
    { value: "account", label: "Problema con la cuenta" },
    { value: "feedback", label: "Feedback de nuestro servicio" },
    { value: "feature", label: "Petición de funcionalidad" },
    { value: "other", label: "Otro" },
];

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            issueType: "",
            subject: "",
            message: "",
        },
    });

    async function onSubmit(data: ContactFormValues) {
        setIsSubmitting(true);

        try {
            await emailjs.send(
                import.meta.env.VITE_SERVICE_ID,
                import.meta.env.VITE_TEMPLATE_ID,
                data,
                import.meta.env.VITE_PUBLIC_KEY
            )

            setIsSubmitted(true);
            enqueueSnackbar("Su mensaje de ha enviado correctamente!", {
                variant: "success",
            });

            // Show success message
            setIsSubmitted(true);
            form.reset();

        } catch (error: any) {
            console.error("Error al enviar el mensaje:", error);
            enqueueSnackbar("No se pudo enviar el mensaje, intente nuevamente o contactese directamente con nosotros!", {
                variant: "error",
            });

        } finally {
            setIsSubmitting(false);
        }
    }

    if (isSubmitted) {
        return (
            <Card className="w-full overflow-hidden border border-border">
                <CardContent className="p-0">
                    <div className="p-6 md:p-8 text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <CheckCircle2 className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">Gracias!</h2>
                        <p className="text-muted-foreground mb-6">
                            Tu mensaje ha sido enviado correctamente. Nuestro equipo de soporte lo revisará y se pondrá en contacto contigo lo antes posible.
                        </p>
                        <Button onClick={() => setIsSubmitted(false)}>Enviar otro mensaje</Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full overflow-hidden border border-border animate-in fade-in-50 duration-300">
            <CardContent className="p-6 md:p-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tu nombre" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="tu.email@ejemplo.com" type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Telefono</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ejemplo: 095123321" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="issueType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo de problema</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un tipo de problema" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {issueTypes.map((type) => (
                                                    <SelectItem key={type.value} value={type.value}>
                                                        {type.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Motivo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Breve descripción del motivo" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Danos más detalles sobre tu problema o consulta"
                                            className="min-h-[120px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Incluye detalles relevantes como mensajes de error, información del dispositivo o cuando sucedió el problema.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Enviando...
                                </>
                            ) : (
                                "Enviar mensaje"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}