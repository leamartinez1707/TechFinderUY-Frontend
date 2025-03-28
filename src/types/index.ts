import { z } from "zod";
import { signInSchema, signUpSchema, signUpUserSchema } from "../schemas/auth-schema";



export type SignUp = z.infer<typeof signUpSchema>;
export type SignUpUser = z.infer<typeof signUpUserSchema>;
export type SignIn = z.infer<typeof signInSchema>;

export type AuthUser = User | UserTechnician | null;

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

export type Technicians = {
    specialization: string;
    services: string[];
    id: number;
    latitude: string;
    longitude: string;
    username: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
}
