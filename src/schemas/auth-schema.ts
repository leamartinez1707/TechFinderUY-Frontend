import { z } from 'zod'



export const signUpSchema = z.object({
    firstName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    lastName: z.string().min(3, 'El apellido debe tener al menos 3 caracteres'),
    email: z.string().email('El email no es válido'),
    phone: z.string().min(8, 'El teléfono debe tener al menos 8 caracteres'),
    services: z.array(z.string()).nonempty('Debes seleccionar al menos un servicio'),
    specialization: z.string().min(6, 'La especialización debe tener al menos 6 caracteres'),
    address: z.string().min(8, 'La dirección debe tener al menos 8 caracteres'),
    username: z.string().min(3, 'El usuario debe tener al menos 3 caracteres'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirm_password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
}).refine(
    (values) => {
        return values.password === values.confirm_password;
    },
    {
        message: "Las contraseñas deben coincidir",
        path: ["confirm_password"],
    }
);

export const signInSchema = z.object({
    username: z.string().min(3, 'El usuario debe tener al menos 3 caracteres'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
});