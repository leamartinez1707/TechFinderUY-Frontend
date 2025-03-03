import { z } from "zod";
import { signInSchema, signUpSchema } from "../schemas/auth-schema";



export type SignUp = z.infer<typeof signUpSchema>;
export type SignIn = z.infer<typeof signInSchema>;



// User types

export type UserClass = {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    isActive: boolean;
}
export type User = {
    id: number;
    specialization: string;
    latitude: string;
    longitude: string;
    services: string[];
    user: UserClass;
}



