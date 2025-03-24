import { z } from "zod";
import { signInSchema, signUpSchema, signUpUserSchema } from "../schemas/auth-schema";



export type SignUp = z.infer<typeof signUpSchema>;
export type SignUpUser = z.infer<typeof signUpUserSchema>;

export type SignIn = z.infer<typeof signInSchema>;



// User types

export type User = {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    isActive: boolean;
}

export type UserTechnician = User & { technician: Technician };

export type Technician = {
    id: number;
    specialization: string;
    latitude: string;
    longitude: string;
    services: string[];
}