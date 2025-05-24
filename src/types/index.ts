import { z } from "zod";
import { signInSchema, signUpSchema, signUpUserSchema } from "../schemas/auth-schema";
import { ReviewSchema, TechReviewSchema } from "@/schemas/technician-schema";



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

export type LoggedUser = User & { technician?: Technician };

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



// Technician

export type TechnicianReview = z.infer<typeof TechReviewSchema>;

export type Review = z.infer<typeof ReviewSchema>;

export type Coordinates = {
    lat: number;
    lng: number;
}

export type EditProfileData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
}

export type EditTechnicalData = {
    specialization: string;
    services: string[];
}
export type EditLocationData = {
    latitude: number;
    longitude: number;
    address: string;
}